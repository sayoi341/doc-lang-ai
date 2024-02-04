import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { chatRoutes } from './chat';

const c = initContract();

export const apiContract = c.router(
  {
    chat: chatRoutes,
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
