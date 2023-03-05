import { useState } from 'react';
import { Button, Input } from 'native-base';
import { View, StyleSheet } from 'react-native';
import { handleLaunchCamera } from '@/lib/uploadImage';

function WriteItemPage() {
  const [localImageURI, setLocalImageURI] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  return (
    <View>
      <View style={styles.container}>
        <Input size="2xl" variant="underlined" placeholder="Name" />
        <Input size="2xl" variant="underlined" placeholder="Description" />
        <Input size="2xl" variant="underlined" placeholder="Price (USD)" />
        <Button size="lg" onPress={() => {
          handleLaunchCamera(setLocalImageURI, setImage)
        }} style={styles.writeBtn}>Choose a Photo</Button>
        <Button size="lg" style={styles.writeBtn}>Write Item</Button>
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