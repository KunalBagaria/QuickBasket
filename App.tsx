/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NativeBaseProvider, Button } from 'native-base';
import { useState, useEffect } from 'react';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    <NativeBaseProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <View style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Button onPress={readTag} size="lg">Scan</Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
