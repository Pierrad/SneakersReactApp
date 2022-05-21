import React, { useState } from "react"

import Product from "../../components/Product"
import Modal from "../../components/Modal"

import useUser from "../../hooks/useUser"
import useProducts from "../../hooks/useProducts"

import { modifyProduct } from "../../services/Product"

import "./styles.css"

const Products = (props) => {
  const user = useUser()
  const products = useProducts()

  const [focusProduct, setFocusProduct] = useState(null)
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isGeolocalizationModalOpen, setIsGeolocalizationModalOpen] =
    useState(false)

  if (!user) return null
  if (!products) return null

  const handleModifyProduct = () => {
    modifyProduct({ ...focusProduct, name, brand, price })
  }

  const renderProductModal = () => (
    <Modal
      onClose={() => setIsProductModalOpen(false)}
      isOpen={isProductModalOpen}
      title="Modifier votre produit"
    >
      <form className="modalInputs d-flex flex-column">
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          className="modalButton rounded border-0 text-white"
          onClick={handleModifyProduct}
        >
          Modifier
        </button>
      </form>
    </Modal>
  )

  const renderGeolocalizationModal = () => (
    <Modal
      onClose={() => setIsGeolocalizationModalOpen(false)}
      isOpen={isGeolocalizationModalOpen}
      title="Coordonnées du produit"
    >
      <div class="mb-2">
        <input
          id="latitude"
          type="text"
          name="latitude"
          placeholder="Latitude"
          class="border border-secondary p-3 rounded"
          aria-describedby="validationLatitudeFeedback"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <div id="validationLatitudeFeedback" class="invalid-feedback">
          Veuillez entrer une latitude valide.
        </div>
      </div>
      <div>
        <input
          id="longitude"
          type="text"
          name="longitude"
          placeholder="Longitude"
          class="border border-secondary p-3 rounded"
          aria-describedby="validationLongitudeFeedback"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
        <div id="validationLongitudeFeedback" class="invalid-feedback">
          Veuillez entrer une longitude valide.
        </div>
      </div>
      <hr />
      <button class="modalButton rounded border-0 text-white">
        Position actuelle
      </button>
      <button type="button" class="rounded border-1">
        Save localization
      </button>
    </Modal>
  )

  const handleProductModal = (id) => {
    const selectedProduct = products.find((product) => product.id === id)
    setFocusProduct(selectedProduct)
    setName(selectedProduct.name)
    setBrand(selectedProduct.brand)
    setPrice(selectedProduct.price)
    setIsProductModalOpen(true)
  }

  const handleGeolocalizationModal = (id) => {
    const selectedProduct = products.find((product) => product.id === id)
    setFocusProduct(selectedProduct)
    setX(selectedProduct.x)
    setY(selectedProduct.y)
    setIsGeolocalizationModalOpen(true)
  }

  return (
    <div className="container  d-flex flex-column px-5">
      <h1 id="title" className="mb-3">
        Bienvenue {user.username}
      </h1>
      <div className="products">
        <div className="numberOfProducts mb-4"></div>
        <div className="productsList">
          {products.map((product, index) => (
            <Product
              key={index}
              {...product}
              onProductClick={handleProductModal}
              onGeolocalizationClick={handleGeolocalizationModal}
            />
          ))}
        </div>
      </div>
      <button
        className="loadMore mx-auto border-0 rounded pt-1 pb-1 ps-2 pe-2 mb-4"
        id="loadMore"
      >
        Voir plus...
      </button>
      {/* <div id="map"></div> */}
      {isProductModalOpen && renderProductModal()}
      {isGeolocalizationModalOpen && renderGeolocalizationModal()}
    </div>
  )
}

export default Products
