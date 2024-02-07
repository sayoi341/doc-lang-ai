import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { useState } from 'react';
import PictureAtom from '~/stores/picture.atom';

const useCamera = () => {
  const [camera, setCamera] = useState<Camera>();
  const [permission, reqestPermission] = Camera.useCameraPermissions();
  const [picture, setPicture] = useAtom(PictureAtom);

  const takePicture = async (route: string) => {
    setPicture(undefined);
    const { base64 } = await camera!.takePictureAsync({ base64: true, quality: 0 });
    setPicture(base64 ?? '');
    router.push(route);
  };

  return { setCamera, permission, reqestPermission, picture, takePicture };
};

export default useCamera;
