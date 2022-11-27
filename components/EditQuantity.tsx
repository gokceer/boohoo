import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { useAppSelector, useAppDispatch } from '../hooks'
import { selectCartItemsWithId, addToCart, removeFromCart } from "../slices/shoppingCartSlice"

import type { CommonProductObjectType } from "../App"

type EditQuantityPropsType = {
  itemInfo: CommonProductObjectType
}

const EditQuantity = ({ itemInfo }: EditQuantityPropsType) => {
  // Take product item info from ProductRowItem
  const { id, colour, name, price, img } = itemInfo
  const items = useAppSelector((state) => selectCartItemsWithId(state, id));
  const dispatch = useAppDispatch();

  // Adds product to the shopping cart using addToCart reducer
  const addItemsToCart = () => {
    dispatch(addToCart({ id, colour, name, price, img }))
  }

  // Remove one item with specified id from the cart
  const removeItemFromCart = () => {
    if (!(items.length > 0)) return;

    dispatch(removeFromCart({ id }));
  };

  // Add/remove item and show quantity
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          disabled={!items.length}
          onPress={removeItemFromCart}
        >
          <MinusCircleIcon size={32} color={items.length > 0 ? "#841584" : "gray"} />
        </TouchableOpacity>
        <Text>{items.length}</Text>
        <TouchableOpacity onPress={addItemsToCart}>
          <PlusCircleIcon size={32} color={items.length > 0 ? "#841584" : "gray"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditQuantity