import axios from 'axios';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Spinner, Stack, Text } from 'native-base';
import { API_URL } from '@/lib/constants';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';


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
      console.log('tag found: ', tagString);
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
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (tagID) {
      setItemLoading(true);
      getItem();
    }
  }, [tagID]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack>
            {!tagID && (
              <>
                <Text>Looking for Items...</Text>
                <Spinner size="lg" color="#FF9195" />
              </>
            )}
            {tagID && itemLoading && (
              <>
                <Text>Tag Found! Loading Details...</Text>
                <Text>Item ID: {tagID}</Text>
                <Spinner size="lg" color="#FF9195" />
              </>
            )}
            {item && !itemLoading && (
              <>
                <Text>Item Found!</Text>
                <Image source={{ uri: item.image }} style={{ width: 360, height: 360 }} />
                <Button style={styles.bottomBtn} size="lg">Add to Cart</Button>
              </>
            )}
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    marginTop: 20,
    borderRadius: 10,
    height: 80,
    width: 377,
    backgroundColor: "#262261"
  },
});

export { ScanItemPage };