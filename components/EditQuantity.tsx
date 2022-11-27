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
  const { id, colour, name, price, img } = itemInfo
  const items = useAppSelector((state) => selectCartItemsWithId(state, id));
  const dispatch = useAppDispatch();

  const addItemsToCart = () => {
    dispatch(addToCart({ id, colour, name, price, img }))
  }

  const removeItemFromCart = () => {
    if (!(items.length > 0)) return;

    dispatch(removeFromCart({ id }));
  };


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