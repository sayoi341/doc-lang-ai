import { Stack, Link } from 'expo-router';
import React from 'react';
import Icon from '~/components/Icon';

const Layout = () => (
  <Stack
    screenOptions={{
      headerTitle: '',
    }}
  >
    <Stack.Screen
      name="index"
      options={{
        headerShown: true,
        headerStyle: { backgroundColor: '#000' },
        headerLeft: ({ tintColor }) => (
          <Link href={'/home/'}>
            <Icon name="home" color={tintColor!} size={24} />
          </Link>
        ),
      }}
    />
    <Stack.Screen name="prompt" />
  </Stack>
);

export default Layout;
