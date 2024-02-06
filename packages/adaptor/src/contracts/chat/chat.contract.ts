import type { AppRoute } from '@ts-rest/core';
import { Base64 } from 'js-base64';
import { z } from 'zod';

const getChat = {
  method: 'GET',
  path: '/chat',
  headers: z.object({
    authorization: z.string(),
  }),
  responses: {
    200: z.string(),
  },
} satisfies AppRoute;

const postChat = {
  method: 'POST',
  path: '/chat',
  headers: z.object({
    Authorization: z.string(),
  }),
  body: z.object({
    image: z.string().refine(Base64.isValid),
    language: z.string(),
  }),
  responses: {
    200: z.object({
      id: z.array(z.string()),
      kwargs: z.object({
        additional_kwargs: z.object({}),
        content: z.string(),
      }),
      lc: z.number(),
      type: z.string(),
    }),
    401: z.object({
      message: z.string(),
    }),
  },
} satisfies AppRoute;

export { getChat, postChat };
