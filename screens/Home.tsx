import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Button, Stack } from 'native-base';
import { useState, useEffect } from 'react';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

function Home() {
  const [hasNfc, setHasNFC] = useState<boolean|null>(null);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()
      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) await NfcManager.start()
    }
    checkIsSupported()
  }, []);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      console.log(tag);
      console.log('tag found');
    })
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    }
  }, []);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack>
            <Button width="250" onPress={readTag} size="lg">Scan Item</Button>
            <Button style={styles.writeBtn} width="250" onPress={readTag} size="lg">Write Item</Button>
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

export { Home };