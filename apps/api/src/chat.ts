import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { sha256 } from 'hono/utils/crypto';
import { Base64 } from 'js-base64';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanMessage, SystemMessage } from 'langchain/schema';
import { z } from 'zod';

import { detectType } from './utils';

type Bindings = {
  OPENAI_API_KEY: string;
  BUCKET: R2Bucket;
  USER: string;
  PASS: string;
};

const chat = new Hono<{ Bindings: Bindings }>();

chat.use('/', async (c, next) => {
  const auth = basicAuth({ username: c.env.USER, password: c.env.PASS });
  return auth(c, next);
});

chat.get('/', (c) => c.text('Auth OK'));

chat.post(
  '/',
  zValidator(
    'json',
    z.object({
      body: z.object({
        image: z.string().refine(Base64.isValid),
        langage: z.string(),
      }),
    }),
  ),
  async (c) => {
    const data = await c.req.json<{
      body: { image: string; langage: string };
    }>();
    const base64 = data.body.image;

    const type = detectType(base64);
    if (!type) return c.notFound();

    const body = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));

    const key = `${await sha256(body)}.${type?.suffix}`;

    await c.env.BUCKET.put(key, body, {
      httpMetadata: {
        contentType: type?.mimeType,
      },
    });

    const vision = new ChatOpenAI({
      openAIApiKey: c.env.OPENAI_API_KEY,
      modelName: 'gpt-4-vision-preview',
      maxTokens: 300,
    });

    const text = await vision.invoke([
      new SystemMessage({
        content: [
          {
            type: 'text',
            text: 'You are OCR machine. Output the characters in the given image. You can only respond with the extracted text.',
          },
        ],
      }),
      new HumanMessage({
        content: [
          {
            type: 'image_url',
            image_url: `https://image.sayoi341.moe/${key}`,
          },
        ],
      }),
    ]);

    const chatgpt = new ChatOpenAI({
      openAIApiKey: c.env.OPENAI_API_KEY,
      modelName: 'gpt-4',
      maxTokens: 300,
    });

    const result = await chatgpt.invoke([
      new SystemMessage({
        content: [
          {
            type: 'text',
            text: `Translate the text given by the user into ${data.body.langage}.`,
          },
        ],
      }),
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: text.content.toString(),
          },
        ],
      }),
    ]);

    return c.json(result.toJSON());
  },
);

export default chat;
