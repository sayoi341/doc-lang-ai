import { Stack } from 'expo-router';

const Layout = () => (
  <Stack
    screenOptions={{
      headerShown: true,
      headerTitle: '',
      headerStyle: { backgroundColor: '#000000' },
      contentStyle: { backgroundColor: '#000000' },
    }}
  />
);

export default Layout;
