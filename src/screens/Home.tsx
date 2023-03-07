import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Button, Stack, Text } from 'native-base';
import { PublicKey } from '@solana/web3.js';
import useAuthorization from '@/lib/useAuthorization';
import ConnectButton from '@/components/ConnectWallet';

function Home({ navigation }: {
  navigation: any
}) {
  const { accounts } = useAuthorization();
  const [publicKey, setPublicKey] = useState<PublicKey|null>(null);

  const navigate = (path: string) => {
    navigation.navigate(path)
  }

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setPublicKey(accounts[0].publicKey);
    }
  }, [accounts]);

  console.log(accounts);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack>
            <Image style={styles.illustration} source={require('../images/home.png')} />
            {!publicKey ? (
              <ConnectButton size="lg" style={styles.connectBtn}>Connect Wallet</ConnectButton>
            ) : (
              <>
                <Text>Connected to PublicKey {publicKey.toBase58()}</Text>
                <Button width="360" onPress={() => navigate('Write')} size="lg" style={styles.bottomBtn} >Write Item</Button>
                <Button width="360" size="lg" onPress={() => navigate('Scan')} style={styles.bottomBtn}>Scan Item</Button>
                <Button width="360" onPress={() => navigate('Cart')} size="lg" style={styles.bottomBtn}>Go To Cart</Button>
              </>
            )}
            {/* <Button width="360" onPress={() => navigate('Gum UI Components')} size="lg" style={styles.bottomBtn}>Test Page</Button> */}
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomBtn: {
    marginTop: 20,
  },
  connectBtn: {
    marginTop: 50,
    backgroundColor: '#FF9195'
  },
  illustration: {
    width: 360,
    height: 300
  }
});

export { Home };