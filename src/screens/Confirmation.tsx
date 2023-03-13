import QRCode from 'react-native-qrcode-svg';
import { View, Text, StyleSheet, Image } from 'react-native';


function OrderConfirmation({ navigation, route }: {
  navigation: any,
  route: any
}) {
  const signature = route.params.signature;
  const qrValue = 'https://quickbasket.app/confirmation/' + signature;
  const logo = require('../images/logo.png');

  return (
    <View style={styles.container}>
      <Image style={styles.paymentConfirmation} source={require('../images/success.png')} />
      <Text style={styles.confirmationText}>Order Confirmation</Text>
      <View style={styles.qrCode}>
        <QRCode logoSize={80} backgroundColor="transparent" color="#262261" logoBackgroundColor="#faaf40" logo={logo} value={qrValue} size={300} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  confirmationText: {
    fontSize: 20,
    marginTop: 30,
    fontWeight: "bold",
    color: "#262261",
  },
  qrCode: {
    marginTop: 20,
  },
  paymentConfirmation: {
    marginTop: 20
  }
});

export { OrderConfirmation };