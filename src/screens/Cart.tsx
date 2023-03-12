import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Button } from "native-base";
import { Cart, cleanCart, getCart } from "@/lib/cart";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

function CartPage() {
  const [cart, setCart] = useState<Cart|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('This is running');
    const getCartLocal = async () => {
      const cart = await getCart();
      console.log('At Cart Page', cart);
      setCart(cart);
      setLoading(false);
    }
    getCartLocal();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {loading && (
            <Loading />
          )}
          {(!loading && cart?.products) && (
            <View>
              {cart?.products.map((item, index) => (
                <View key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.price}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export { CartPage };