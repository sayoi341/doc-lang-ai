import { Buffer } from 'buffer';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PictureAtom from '~/stores/picture.atom';
import TransratedText from '~/stores/transratedText.atom';
import fetcher from '~/utils/fetcher';

const App = () => {
  const [transratedText, setTransratedText] = useAtom(TransratedText);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-medium">翻訳結果</Text>

      <Text className="font-medium">{transratedText}</Text>
      <TouchableOpacity
        className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onPress={() => {
          router.push('/home/');
        }}
      >
        <Text className="text-white font-medium">戻る</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
