import type { AppRouter } from '@ts-rest/core';
import { getChat, postChat } from './chat.contract';

const chatRoutes = {
  getChat,
  postChat,
} satisfies AppRouter;

export { chatRoutes };
