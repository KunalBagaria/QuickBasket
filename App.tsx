import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/screens/Home';
import { WriteItemPage } from '@/screens/Write';
import { ScanItemPage } from '@/screens/ScanItem';
import { CartPage } from '@/screens/Cart';
// import { TestPage } from '@/screens/Test';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="QuickBasket">
          <Stack.Screen name="QuickBasket" component={Home} />
          <Stack.Screen name="Write" component={WriteItemPage} />
          <Stack.Screen name="Scan" component={ScanItemPage} />
          <Stack.Screen name="Cart" component={CartPage} />
          {/* <Stack.Screen name="Gum UI Components" component={TestPage} /> */}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;