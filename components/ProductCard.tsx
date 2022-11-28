import React from 'react'
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from "../App"

import type { CommonProductObjectType } from "../App"

type ProductNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductCard = ({ id, colour, name, price, img }: CommonProductObjectType) => {
  const navigation = useNavigation<ProductNavigationProp>()

  // Display product in a card
  return (
    <TouchableOpacity
      testID='detail_btn'
      key={id}
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { id, colour, name, price, img })}>
      <Image testID={"product_img"} source={{ uri: img }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{name}</Text>
        <Text style={styles.price}>£ {price}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: '4%',
  },
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

export default ProductCard