import { AntDesign } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import TabBarIcon from '~/components/TabBarIcon';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    ...AntDesign.font,
  });
  const path = usePathname();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const hide = path == '/camera' && path != '/camera/prompt';

  return (
    <ThemeProvider value={DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#BE123C',
          headerShown: false,
          tabBarStyle: {
            display: hide ? 'none' : 'flex',
          },
        }}
      >
        <Tabs.Screen
          name="camera"
          options={{
            title: 'camera',
            href: '/camera',
            tabBarIcon: ({ color }) => <TabBarIcon name="camerao" color={color} />,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'chat',
            tabBarIcon: ({ color }) => <TabBarIcon name="message1" color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'index',
            href: null,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
};

export default RootLayout;
