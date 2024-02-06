import { Stack } from 'expo-router';

const Layout = () => (
  <Stack
    screenOptions={{
      headerTitle: '',
    }}
  >
    <Stack.Screen name="index" options={{ headerShown: true, headerStyle: { backgroundColor: '#000' } }} />
    <Stack.Screen name="prompt" />
  </Stack>
);

export default Layout;
