import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import PictureAtom from '~/stores/picture.atom';

const App = () => {
  const [camera, setCamera] = useState<Camera>();
  const [permission, reqestPermission] = Camera.useCameraPermissions();

  const [picture, setPicture] = useAtom(PictureAtom);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <TouchableOpacity
        className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onPress={async () => {
          reqestPermission();
        }}
      >
        <Text className="text-white font-medium">カメラアクセスを要求する！！！！！</Text>
      </TouchableOpacity>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const { base64 } = await camera.takePictureAsync({ base64: true, quality: 0 });
      setPicture(base64 ?? '');
      router.push('/camera/prompt');
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Camera
        className="h-5/6 w-full"
        type={CameraType.back}
        ref={(ref) => {
          setCamera(ref);
        }}
      ></Camera>
      <View className="h-1/6 w-full items-center bg-black">
        <TouchableOpacity className="mt-4 h-16 w-16 rounded-full bg-white" onPress={takePicture}></TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
