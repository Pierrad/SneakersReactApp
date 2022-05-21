import { callAPI } from "./API"; 
import Product from "../models/Product";

export const getProducts = () => {
  callAPI("GET", 'products', {})
    .then((res) => {
      const products = res.data.products;
      const newProducts = products.map((product) => {
        return Product(product);
      });

      localStorage.setItem('products', JSON.stringify(newProducts))
    })
}

export const getOneProduct = (productId) => {
  const product = callAPI("GET", `products/${productId}`, {})
    .then((res) => {
      return Product(res.data.product);
    });

  return product;
}

export const modifyProduct = (prod) => {
  console.log(prod)
  callAPI("POST", `products/${prod.id}`, {
    content: {
      name: prod.name,
      brand: prod.brand,
      price: prod.price,
      ...(prod.x && prod.y ? { x: prod.x, y: prod.y } : {})
    }
  })
    .then((res) => {
      if (res.success === true) {
        window.location.reload();
      } else {
        console.warn("Error while updating product");
      }
    });
}
