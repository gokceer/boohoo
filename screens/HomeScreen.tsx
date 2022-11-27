import React, { useEffect, useState } from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'
import ProductCard from '../components/ProductCard'

import type { CommonProductObjectType } from "../App"

type ResponseErrType = { message: string }

const HomeScreen = () => {
  const [products, setProducts] = useState<CommonProductObjectType[]>([])

  // Fetch product data from API
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/benirvingplt/products/products")
      .then(response => response.json())
      .then((data?: CommonProductObjectType[] | undefined) => setProducts(data))
      .catch((error?: ResponseErrType) => console.error(error.message))
  }, [])

  // List all products in ScrollView
  return (
    <>
      {products.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              colour={product.colour}
              name={product.name}
              price={product.price}
              img={product.img}
            />
          ))}
        </ScrollView>
      ) : <Text>We are sorry! Something went wrong.</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#dcdcdc"
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
})

export default HomeScreen