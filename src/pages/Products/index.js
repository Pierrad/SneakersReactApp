import React, { useMemo, useState } from "react"

import Product from "../../components/Product"
import Modal from "../../components/Modal"

import useUser from "../../hooks/useUser"
import useProducts from "../../hooks/useProducts"

import ExternalLink from '../../assets/images/external_link.svg'

import "./styles.css"

const Products = (props) => {
  const user = useUser()
  const products = useProducts()

  const [focusProduct, setFocusProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isGeolocalizationModalOpen, setIsGeolocalizationModalOpen] = useState(false)

  const renderProductModal = () => (
    <Modal
      onClose={() => setIsProductModalOpen(false)}
      isOpen={isProductModalOpen}
      title="Modifier votre produit"
    >
      <form className="modalInputs d-flex flex-column">
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          id="modalNameInput"
          name="name"
          value={focusProduct.name}
        />
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          id="modalBrandInput"
          name="brand"
          value={focusProduct.brand}
        />
        <input
          className="modalInput mb-3 p-3 border-0 rounded"
          id="modalPriceInput"
          name="price"
          value={focusProduct.price}
        />
        <button
          className="modalButton hide rounded border-0 text-white"
          id="modalSubmit"
        >
          Modifier
        </button>
      </form>
      <img
        src={ExternalLink}
        alt="External link logo"
        id="modalExternalLink"
        className="externalLink position-absolute bottom-0 end-0"
      />
    </Modal>
  )

  const renderGeolocalizationModal = () => (
    <Modal
      onClose={() => setIsGeolocalizationModalOpen(false)}
      isOpen={isGeolocalizationModalOpen}
    >
      
    </Modal>
  )
  

  const handleProductModal = (id) => {
    setIsProductModalOpen(true)
    setFocusProduct(products.filter(product => product.id === id)[0])
  }

  const handleGeolocalizationModal = (id) => {
    setIsGeolocalizationModalOpen(true)
    setFocusProduct(products.filter(product => product.id === id)[0])
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
      <div id="map"></div>
      {isProductModalOpen && renderProductModal()}
      {isGeolocalizationModalOpen && renderGeolocalizationModal()}
    </div>
  )
}

export default Products
