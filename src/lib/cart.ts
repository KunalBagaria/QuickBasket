import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  store_id: number;
}

interface Store {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Cart {
  products: Product[];
  store: Store;
}

async function getCart(): Promise<Cart | null> {
  const cartString = await AsyncStorage.getItem('cart');
  if (cartString) {
    const data = JSON.parse(cartString);
    return data;
  }
  return null;
}

async function addItemToCart(product: Product, store: Store) {
  const cart = await getCart();
  if (cart !== null) {
    if (cart.store.id !== store.id) {
      console.log('STORE_ID MISMATCH', cart.store.id, store.id);
      throw new Error('You can only add items from one store at a time');
    }
    const item = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      store_id: product.store_id,
    }
    cart.products.push(item);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } else {
    await AsyncStorage.setItem('cart', JSON.stringify({ products: [product], store }));
  }
}

async function cleanCart() {
  await AsyncStorage.removeItem('cart');
}

export { getCart, addItemToCart, cleanCart };