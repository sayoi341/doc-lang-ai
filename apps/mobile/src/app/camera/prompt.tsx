import { Picker } from '@react-native-picker/picker';
import { Buffer } from 'buffer';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useAtom } from 'jotai';
import Icon from '~/components/Icon';
import fetcher from '~/utils/fetcher';
import PictureAtom from '~/stores/picture.atom';
import languages from '~/constants/language';

const App = () => {
  const [picture, setPicture] = useAtom(PictureAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [transratedText, setTransratedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState();

  const fetch = async (lang: string) => {
    setIsLoading(true);
    try {
      const res = await fetcher.chat.postChat({
        headers: {
          Authorization: `Basic ${Buffer.from(process.env.EXPO_PUBLIC_USER + ':' + process.env.EXPO_PUBLIC_PASS).toString('base64')}`,
        },
        body: {
          image: picture,
          language: lang,
        },
      });
      setIsLoading(false);
      console.log(res);
      setTransratedText(res.body.kwargs.content);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <View className="flex flex-col gap-10 items-center justify-center my-auto">
        <Text className="text-4xl font-bold">翻訳中</Text>
        <Icon name="filetext1" color="black" size={128} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (transratedText === '') {
    return (
      <View className="flex flex-col gap-10 items-center justify-center my-auto">
        <View>
          <Text className="text-4xl font-bold">文章を翻訳しますか？</Text>
        </View>
        <View className="flex flex-col text-black">
          <Text className="text-xl">翻訳する言語を選択して下さい</Text>
          <Picker className="" selectedValue={selectedLanguage} onValueChange={(itemValue) => setSelectedLanguage(itemValue)}>
            {languages.map((language) => (
              <Picker.Item label={language} value={language} key={language} />
            ))}
          </Picker>
        </View>
        <View className="flex flex-row gap-5 justify-between">
          <TouchableOpacity className="w-32 items-center bg-white rounded-lg px-5 py-2.5 me-2 mb-2" onPress={() => router.push('/camera/')}>
            <Text className="text-gray-900 text-base font-medium">再撮影</Text>
          </TouchableOpacity>
          <TouchableOpacity className=" w-32 items-center bg-blue-700 rounded-lg px-5 py-2.5 me-2 mb-2" onPress={() => fetch(selectedLanguage!)}>
            <Text className="text-white text-base font-medium">翻訳する</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
