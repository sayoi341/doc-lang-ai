import type { AppRoute } from '@ts-rest/core';
import { Base64 } from 'js-base64';
import { z } from 'zod';

const getChat = {
  method: 'GET',
  path: '/chat',
  responses: {
    200: z.string(),
  },
} satisfies AppRoute;

const postChat = {
  method: 'POST',
  path: '/chat',
  body: z.object({
    image: z.string().refine(Base64.isValid),
    language: z.string(),
  }),
  responses: {
    200: z.object({
      message: z.string(),
    }),
  },
} satisfies AppRoute;

export { getChat, postChat };
