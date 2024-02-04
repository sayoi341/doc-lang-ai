import { Camera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAtom } from 'jotai';
import { Link } from 'expo-router';

import PictureAtom from '@/src/store/picture';

const App = () => {
  const [camera, setCamera] = useState<Camera>();
  const [permission, reqestPermission] = Camera.useCameraPermissions();

  const [picture, setPicture] = useAtom(PictureAtom);

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const { base64 } = await camera.takePictureAsync({ base64: true, quality: 0 });
      setPicture(base64 ?? '');
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
      <View className="h-1/6 items-center">
        <TouchableOpacity className="mt-4 h-16 w-16 rounded-full bg-white" onPress={takePicture}></TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
