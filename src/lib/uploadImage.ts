import axios from 'axios';
import base64 from 'react-native-base64';
import { launchCamera } from 'react-native-image-picker';

const handleLaunchCamera = async (
  setLocalImageURI: (localImageURI: string | null) => void,
  setImage: (image: string | null) => void
) => {
  const result = await launchCamera({ mediaType: 'photo' });
  const localImage = result.assets?.[0];
  if (localImage && localImage.uri) {
    setLocalImageURI(localImage.uri);
    const formData = new FormData();
    formData.append('file', {
      uri: localImage.uri,
      type: localImage.type,
      name: localImage.fileName
    });
    formData.append('upload_preset', 'ml_default');
    try {
      const auth = {
        username: '679238746247371',
        password: 'VBuX5Tm_7RRryTwTmsLENlpfjng',
      }
      const authHeader = 'Basic ' + base64.encode(`${auth.username}:${auth.password}`);
      console.log('Uploading...');
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/quickbasket/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': authHeader
          }
        }
      );
      console.log('Image URL: ', response.data.secure_url);
      setImage(response.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  }
};

export { handleLaunchCamera };