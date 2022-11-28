import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { useAppSelector } from '../hooks'
import { selectCartItems } from "../slices/shoppingCartSlice"

import type { RootStackParamList } from "../App"

type ShoppingCartNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ShoppingCart'>;

// This component shows cart icon, quantity and navigates to ShoppingCartScreen
const CartIcon = () => {
  const navigation = useNavigation<ShoppingCartNavigationProp>()
  const quantity = useAppSelector(selectCartItems);

  return (
    <TouchableOpacity testID='cart_btn' style={styles.quantityText} onPress={() => navigation.navigate("ShoppingCart")}>
      <ShoppingBagIcon testID='cart_icon' size={20} color="#841584" />
      <Text>{quantity.length}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  quantityText: { flexDirection: "row", alignItems: "center" }
})

export default CartIcon