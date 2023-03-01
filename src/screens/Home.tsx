import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { Button, Stack } from 'native-base';

function Home({ navigation }: {
  navigation: any
}) {

  const navigate = (path: string) => {
    navigation.navigate(path)
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
            <Image style={styles.illustration} source={require('../images/home.png')} />
            <Button width="360" size="lg" onPress={() => navigate('Scan')} style={styles.scanBtn}>Scan Item</Button>
            <Button width="360" onPress={() => navigate('Write')} size="lg" style={styles.bottomBtn} >Write Item</Button>
            <Button width="360" onPress={() => navigate('Cart')} size="lg" style={styles.bottomBtn}>Go To Cart</Button>
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
  scanBtn: {
    marginTop: 50,
    backgroundColor: '#FF9195'
  },
  illustration: {
    width: 360,
    height: 300
  }
});

export { Home };