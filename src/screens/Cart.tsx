import useAuthorization from '@/lib/useAuthorization';
import useGuardedCallback from '@/lib/useGuardedCallback';
import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Cart, cleanCart, getCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { Button } from "native-base";
import { getConnection, getTransferSOLTransaction, getTransferTokenTransaction } from "@/lib/transaction";
import { PublicKey } from '@solana/web3.js';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { USDC_TOKEN } from '@/lib/constants';
import { showToast } from '@/lib/utils';

function CartPage({ navigation }: {
  navigation: any
}) {
  const {authorizeSession, selectedAccount} = useAuthorization();
  const [cart, setCart] = useState<Cart|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getCartLocal = async () => {
      const cart = await getCart();
      setCart(cart);
      const totalPrice = cart?.products.reduce((a, b) => a + b.price, 0);
      setTotal(totalPrice || 0);
      setLoading(false);
    }
    getCartLocal();
  }, []);

  const transferTokens = useGuardedCallback(
    async (): Promise<string | null> => {
      const signature = await transact(async (wallet) => {
        setLoading(true);
        const connection = getConnection();
        const freshAccount = await authorizeSession(wallet);
        const transaction = await getTransferTokenTransaction(
          total,
          freshAccount.publicKey,
          // replace with store's public key
          new PublicKey("8kgbAgt8oedfprQ9LWekUh6rbY264Nv75eunHPpkbYGX"),
          USDC_TOKEN
        );
        if (!transaction) return null;
        const signedTransaction = await wallet.signTransactions({
          transactions: [transaction],
        });
        const signature = await connection.sendRawTransaction(signedTransaction[0].serialize());
        return signature;
      });
      return signature || null;
    },
    [authorizeSession, selectedAccount],
  );

  const handleCheckout = async () => {
    const signature = await transferTokens();
    if (typeof signature === 'string') {
      console.log('Signature: ', signature);
      const confirmation = await getConnection().confirmTransaction(signature);
      console.log('Confirmation: ', confirmation);
      showToast('Payment Successful. Thank you for shopping with us!');
      cleanCart();
      navigation.navigate('Confirmation', { signature });
      setLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          {loading && (
            <Loading />
          )}
          {(!loading && cart?.products) && (
            <View>
              {cart?.products.map((item, index) => (
                <View style={styles.item} key={index}>
                  <Image style={styles.productImage} source={{ uri: item.image }} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.total}>Total: ${total}</Text>
              <Button
                onPress={handleCheckout}
                style={styles.bottomBtn}
                size="lg"
              >
                Pay with USDC
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#262261"
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FAAF40"
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    width: "100%",
  },
  itemDetails: {
    marginLeft: 20,
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  bottomBtn: {
    marginTop: 28,
    borderRadius: 10,
    height: 50,
    width: 377,
    backgroundColor: "#262261"
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#262261",
    marginTop: 28,
  }
});

export { CartPage };