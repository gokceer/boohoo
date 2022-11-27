import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'
import { useAppDispatch } from '../hooks'
import { addToCart } from "../slices/shoppingCartSlice"

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from "../App"

type ProductDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen = ({ route }: ProductDetailScreenNavigationProp) => {
  // Take product data received from HomeScreen
  const { id, colour, name, price, img } = route.params
  const dispatch = useAppDispatch()

  // Adds product to the shopping cart using addToCart reducer
  const addItemsToCart = () => {
    dispatch(addToCart({ id, colour, name, price, img }))
  }

  // Display product in a card
  return (
    <View>
      <Image source={{ uri: img }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{name}</Text>
        <Text style={styles.price}>£ {price}</Text>
      </View>
      <Button
        onPress={addItemsToCart}
        title="Add To Cart"
        color="#841584"
        accessibilityLabel="Add To Cart Button"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  infoContainer: {
    padding: 16
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  }
})

export default ProductDetailScreen