import React, { useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Stack, Text } from 'native-base';
import { useState, useEffect } from 'react';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';


function ScanItemPage({ navigation }: {
  navigation: any
}) {
  const [hasNfc, setHasNFC] = useState<boolean|null>(null);

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
      console.log(tag);
      console.log('tag found');
    });
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack>
            <Text>Looking for Items...</Text>
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  writeBtn: {
    marginTop: 20
  }
});

export { ScanItemPage };