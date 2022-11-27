import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useAppDispatch } from '../hooks'
import { removeAllFromCartWithId } from "../slices/shoppingCartSlice"
import EditQuantity from '../components/EditQuantity';

import type { CommonProductObjectType } from "../App"

type ProductRowItemPropsType = {
  items: CommonProductObjectType[]
}

const ProductRowItem = ({ items }: ProductRowItemPropsType) => {
  const dispatch = useAppDispatch()

  // Display product information, quantity and price in a row. Edit quantity/remove product.
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <EditQuantity itemInfo={items[0]} />
        <TouchableOpacity>
          <Text
            style={{ color: "#841584" }}
            onPress={() => dispatch(removeAllFromCartWithId({ id: items[0]?.id }))}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.image} source={{ uri: items[0]?.img }} />
      <Text style={{ flex: 1 }} numberOfLines={4} ellipsizeMode='tail'>{items[0]?.name}</Text>
      <Text>
        £ {items[0]?.price * items.length}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  image: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'
  },
})

export default ProductRowItem