import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Spinner, Stack, Text } from 'native-base';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';


function ScanItemPage({ navigation }: {
  navigation: any
}) {
  const [hasNfc, setHasNFC] = useState<boolean|null>(null);
  const [scanned, setScanned] = useState<boolean>(true);

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
      setScanned(false);
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
            {scanned && (
              <>
                <Text>Looking for Items...</Text>
                <Spinner size="lg" color="#FF9195" />
              </>
            )}
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export { ScanItemPage };