import { Image } from "react-native"
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartIcon from './components/CartIcon';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';

export type CommonProductObjectType = {
  colour: string,
  name: string,
  img: string,
  id: number,
  price: number,
}

export type RootStackParamList = {
  Home: undefined;
  ShoppingCart: undefined;
  ProductDetail: CommonProductObjectType
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}
            options={{
              title: "",
              headerRight: () => (<CartIcon />),
              headerLeft: () => (<Image style={{ width: 50, height: 50 }} source={require('./assets/boohoo-icon.png')} />),
            }}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen}
            options={{
              title: "Product Detail",
              headerRight: () => (<CartIcon />)
            }}
          />
          <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen}
            options={{
              title: "Shopping Cart",
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
