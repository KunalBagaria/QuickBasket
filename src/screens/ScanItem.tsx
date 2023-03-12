import axios from 'axios';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import NfcManager, {
  NfcEvents,
  Ndef
} from 'react-native-nfc-manager';
import { useState, useEffect } from 'react';
import { Loading } from './Loading';
import { Button, Spinner, Stack, Text } from 'native-base';
import { API_URL } from '@/lib/constants';
import { showToast } from '@/lib/utils';
import { addItemToCart } from '@/lib/cart';


function ScanItemPage({ navigation }: {
  navigation: any
}) {
  const [hasNfc, setHasNFC] = useState<boolean|null>(null);
  const [tagID, setTagID] = useState<string|null>(null);
  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()
      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        await NfcManager.start();
        await NfcManager.registerTagEvent();
      }
    }
    checkIsSupported();
  }, []);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      const payload = tag.ndefMessage[0].payload;
      const tagString = Ndef.text.decodePayload(payload);
      setTagID(tagString);
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }, []);

  useEffect(() => {
    async function getItem() {
      try {
        const response = await axios.get(API_URL + '/product/' + tagID);
        setItemLoading(false);
        setItem(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (tagID) {
      setItemLoading(true);
      getItem();
    }
  }, [tagID]);

  const handleAddToCart = async () => {
    await addItemToCart(item, item.store);
    showToast('Added to Cart! 🛒');
    navigation.navigate('Cart');
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Stack>
            {!tagID && (
              <View style={styles.loadingContainer}>
                <Text style={styles.regularText}>Looking for Items</Text>
                <Loading style={styles.spinner} />
              </View>
            )}
            {tagID && itemLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.regularText}>Loading Item</Text>
                <Loading style={styles.spinner} />
              </View>
            )}
            {item && !itemLoading && (
              <View style={styles.itemDetails}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Button onPress={handleAddToCart} style={styles.bottomBtn} size="lg">Add to Cart</Button>
              </View>
            )}
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  loadingContainer: {
    marginTop: 200,
  },
  regularText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#262261",
  },
  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 30,
    textAlign: "left",
    width: 377
  },
  description: {
    fontSize: 18,
    marginTop: 10,
    opacity: 0.5,
    textAlign: "left",
    width: 377
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#262261",
    marginTop: 28,
    textAlign: "left",
    width: 377
  },
  bottomBtn: {
    marginTop: 28,
    borderRadius: 10,
    height: 80,
    width: 377,
    backgroundColor: "#262261"
  },
  spinner: {
    marginTop: 20,
  },
  itemImage: {
    width: 377,
    height: 377,
    marginTop: 20,
    borderRadius: 10,
  },
  itemDetails: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  }
});

export { ScanItemPage };