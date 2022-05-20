import { useEffect } from 'react'

import { getProducts } from '../services/Product' 

const useProducts = () => {

  useEffect(() => {
    getProducts()
  }, [])

  const products = JSON.parse(localStorage.getItem("products"))

  return products
}


export default useProducts