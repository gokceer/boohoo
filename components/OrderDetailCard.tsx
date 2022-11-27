import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useAppSelector } from '../hooks'
import { selectCartTotal } from "../slices/shoppingCartSlice"

const OrderDetailCard = () => {
  // Take total price in the cart
  const cartTotal = useAppSelector(selectCartTotal);

  // Display subtotal, delivery fee and total price in a card.
  return (
    <>
      {cartTotal > 0 &&
        <View style={styles.container}>
          <View style={styles.textRows}>
            <Text>Subtotal</Text>
            <Text>£ {cartTotal}</Text>
          </View>

          <View style={styles.textRows}>
            <Text>Delivery Fee</Text>
            <Text>£ {5}</Text>
          </View>

          <View style={styles.textRows}>
            <Text style={styles.price}>Order Total </Text>
            <Text style={styles.price}>£ {cartTotal + 5}</Text>
          </View>

          <Button
            onPress={null}
            title="Place Order"
            color="#841584"
            accessibilityLabel="Place Order Button"
          />
        </View>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  textRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 7
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  }
})

export default OrderDetailCard