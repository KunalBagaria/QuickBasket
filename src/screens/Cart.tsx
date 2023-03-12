import { View, Image, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Cart, getCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import { Button } from "native-base";

function CartPage() {
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
              <Button style={styles.bottomBtn} size="lg">Checkout</Button>
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