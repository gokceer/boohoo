import React, { useEffect, useState } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import { useAppSelector } from '../hooks'
import { selectCartItems } from "../slices/shoppingCartSlice"
import OrderDetailCard from '../components/OrderDetailCard';
import ProductRowItem from '../components/ProductRowItem';

import type { CommonProductObjectType } from "../App"

type GroupedItemsType = {
  [key: string]: CommonProductObjectType[]
}

const ShoppingCartScreen = () => {
  // Retrieve added items in the cart
  const items = useAppSelector(selectCartItems);
  const [groupedItemsInCart, setGroupedItemsInCart] = useState<GroupedItemsType>({});

  // Group items according to id's
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInCart(groupedItems);
  }, [items]);

  // List all items in the cart
  return (
    <>
      {items.length > 0 ? (
        <>
          <ScrollView>
            {Object.entries(groupedItemsInCart).map(([key, items]) => (
              <ProductRowItem key={key} items={items} />
            ))}
          </ScrollView>
          <OrderDetailCard />
        </>
      ) :
        <Text style={styles.noItemText}>You have no items in your Cart! Let's start shopping.</Text>}
    </>

  )
}

const styles = StyleSheet.create({
  noItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: "center",
  }
})

export default ShoppingCartScreen