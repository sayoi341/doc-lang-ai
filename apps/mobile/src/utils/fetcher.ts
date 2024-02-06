import { apiContract } from '@my/adaptor';
import { initClient } from '@ts-rest/core';

const fetcher = initClient(apiContract, {
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL!,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
});

export default fetcher;
