import axios from 'axios';
import { useState } from 'react';
import { Button, Input, Text } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { handleLaunchCamera } from '@/lib/uploadImage';
import { API_URL } from '@/lib/constants';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';


function WriteItemPage() {
  const [localImageURI, setLocalImageURI] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [tagWritten, setTagWritten] = useState<boolean>(false);

  async function handleNetworkRequest() {
    if (image && name && description && price) {
      console.log('Sending network request...');
      try {
        const data = {
          name,
          description,
          image,
          price: Number(price),
          store_id: 1
        }
        const response = await axios.post(API_URL + '/product/create', data);
        console.log(response.data);
        setTag(response.data.tag);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function handleTagWrite() {
    let result = false;
    if (!tag) return result;
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(tag)]);
      if (!bytes) return result;
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      result = true;
      setTagWritten(true);
      console.log('Tag written!');
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return result;
  }

  async function reloadScreen() {
    setLocalImageURI(null);
    setImage(null);
    setName(null);
    setDescription(null);
    setPrice(null);
    setTag(null);
    setTagWritten(false);
  }

  return (
    <View>
      <View style={styles.container}>
        {!tag && (
          <>
            <Input onChangeText={(text) => setName(text)} size="2xl" variant="underlined" placeholder="Name" />
            <Input onChangeText={(text) => setDescription(text)} size="2xl" variant="underlined" placeholder="Description" />
            <Input onChangeText={(text) => setPrice(text)} size="2xl" variant="underlined" placeholder="Price (USD)" />
            {image ? (
              <Text>Image uploaded ✅</Text>
            ) : (
              <Button size="lg" onPress={() => {
                handleLaunchCamera(setLocalImageURI, setImage)
              }} style={styles.writeBtn}>Take a Photo</Button>
            )}
            <Button onPress={handleNetworkRequest} size="lg" style={styles.writeBtn}>Save Item</Button>
          </>
        )}
        {tag && !tagWritten && (
          <>
            <Text>Item saved! 🎉</Text>
            <Text>Tag: {tag}</Text>
            <Text>Write this tag to the item you want to sell.</Text>
            <Button onPress={handleTagWrite} size="lg" style={styles.writeBtn}>Write Tag</Button>
          </>
        )}
        {tag && tagWritten && (
          <>
            <Text>Tag written! 🎉</Text>
            <Button onPress={reloadScreen} size="lg" style={styles.writeBtn}>Write another Tag</Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  writeBtn: {
    width: "100%",
  }
});

export { WriteItemPage }