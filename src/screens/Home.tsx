import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image
} from 'react-native';
import useAuthorization from '@/lib/useAuthorization';
import ConnectButton from '@/components/ConnectWallet';
import { Button, Stack, Text } from 'native-base';
import { PublicKey } from '@solana/web3.js';
import { getTrimmedPublicKey, showToast } from '@/lib/utils';
import { cleanCart } from '@/lib/cart';

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

  const handleClearCart = async () => {
    await cleanCart();
    showToast('Cart Cleared');
  }

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Stack>
            {!publicKey ? (
              <>
                <Image style={styles.illustration} source={require('../images/logo.png')} />
                <ConnectButton size="lg" style={styles.connectBtn}>Connect Wallet</ConnectButton>
              </>
            ) : (
              <>
                <Image style={styles.smallIllustration} source={require('../images/logo.png')} />
                <Text style={styles.connectedText}>Connected to Wallet: {getTrimmedPublicKey(publicKey)}</Text>
                <Button width="377" onPress={() => navigate('Write')} size="lg" style={styles.bottomBtn} >Write Item</Button>
                <Button width="377" size="lg" onPress={() => navigate('Scan')} style={styles.bottomBtn}>Scan Item</Button>
                <Button width="377" onPress={() => navigate('Cart')} size="lg" style={styles.bottomBtn}>Go To Cart</Button>
                <Button width="377" onPress={handleClearCart} size="lg" style={styles.bottomBtn}>Clear Cart</Button>
              </>
            )}
          </Stack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FAAF40",
    height: "100%"
  },
  bottomBtn: {
    marginTop: 20,
    borderRadius: 10,
    height: 80,
    backgroundColor: "#262261"
  },
  connectBtn: {
    marginTop: 50,
    borderRadius: 10,
    height: 80,
    width: 377,
    backgroundColor: '#262261'
  },
  illustration: {
    width: 377,
    height: 377
  },
  smallIllustration: {
    width: 200,
    height: 200
  },
  connectedText: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
    fontWeight: 'bold'
  }
});

export { Home };