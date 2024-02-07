import { Camera, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';

import useCamera from '~/hooks/useCamera';

const App = () => {
  const { setCamera, permission, reqestPermission, picture, takePicture } = useCamera();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <TouchableOpacity
        className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onPress={() => reqestPermission()}
      >
        <Text className="font-medium text-white ">カメラアクセスを要求する！！！！！</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Camera
        className="h-5/6 w-full"
        type={CameraType.back}
        ref={(ref) => {
          setCamera(ref!);
        }}
      ></Camera>
      <View className="h-1/6 w-full items-center bg-black">
        <TouchableOpacity className="mt-4 h-16 w-16 rounded-full bg-white" onPress={() => takePicture('/camera/prompt')}></TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
