import React, { useCallback, useMemo, useState } from "react"
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import Product from "../../components/Product"
import Modal from "../../components/Modal"

import useUser from "../../hooks/useUser"
import useProducts from "../../hooks/useProducts"

import { modifyProduct } from "../../services/Product"

import 'leaflet/dist/leaflet.css'
import markerIcon from "leaflet/dist/images/marker-icon.png"

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
  const [isInvalidLocalization, setIsInvalidLocalization] = useState(false)
  const [numberOfDisplayedProducts, setNumberOfDisplayedProducts] = useState(5)

  const paginatedProducts = useMemo(() => {
    return products.slice(0, numberOfDisplayedProducts)
  }, [numberOfDisplayedProducts, products])

  const handleLoadMore = useCallback(() => {
    setNumberOfDisplayedProducts(numberOfDisplayedProducts + 5)
  }, [numberOfDisplayedProducts])

  const handleModifyProduct = useCallback(() => {
    modifyProduct({ ...focusProduct, name, brand, price, x, y })
  }, [brand, focusProduct, name, price, x, y])

  const checkLocalizationInput = useCallback(() => {
    if (x.match(/[a-z]/i) || y.match(/[a-z]/i)) {
      setIsInvalidLocalization(true)
    }
    setIsInvalidLocalization(false)
  }, [x, y])

  const handleLocalizationInputX = useCallback((event) => {
    setX(event.target.value)
    checkLocalizationInput()
  }, [checkLocalizationInput])

  const handleLocalizationInputY = useCallback((event) => {
    setY(event.target.value)
    checkLocalizationInput()
  }, [checkLocalizationInput])

  const handleAutoGeolocalization = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setX(position.coords.latitude)
        setY(position.coords.longitude)
      }, () => {
        alert('Geolocalization failed')
      }
    )

  }, [])

  const setProductValues = (product) => {
    setName(product.name)
    setBrand(product.brand)
    setPrice(product.price)
    setX(product.x || "")
    setY(product.y || "")
  }

  const handleProductModal = (id) => {
    const selectedProduct = products.find((product) => product.id === id)
    setFocusProduct(selectedProduct)
    setProductValues(selectedProduct)
    setIsProductModalOpen(true)
  }

  const handleGeolocalizationModal = (id) => {
    const selectedProduct = products.find((product) => product.id === id)
    setFocusProduct(selectedProduct)
    setProductValues(selectedProduct)
    setIsGeolocalizationModalOpen(true)
  }

  const renderProductModal = useMemo(() => (
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
  ), [brand, handleModifyProduct, isProductModalOpen, name, price])

  const renderGeolocalizationModal = useMemo(() => (
    <Modal
      onClose={() => setIsGeolocalizationModalOpen(false)}
      isOpen={isGeolocalizationModalOpen}
      title="Coordonnées du produit"
    >
      <div className="mb-2 w-100">
        <input
          id="latitude"
          type="text"
          name="latitude"
          placeholder="Latitude"
          className="border border-secondary p-3 rounded"
          aria-describedby="validationLatitudeFeedback"
          value={x}
          onChange={handleLocalizationInputX}
        />
        <div id="validationLatitudeFeedback" className={`invalid-feedback ${isInvalidLocalization ? 'is-invalid' : ''}`}>
          Veuillez entrer une latitude valide.
        </div>
      </div>
      <div className="w-100">
        <input
          id="longitude"
          type="text"
          name="longitude"
          placeholder="Longitude"
          className="border border-secondary p-3 rounded"
          aria-describedby="validationLongitudeFeedback"
          value={y}
          onChange={handleLocalizationInputY}
        />
        <div id="validationLongitudeFeedback" className={`invalid-feedback ${isInvalidLocalization ? 'is-invalid' : ''}`}>
          Veuillez entrer une longitude valide.
        </div>
      </div>
      <hr />
      <button className="modalButton rounded border-0 text-white mb-2" onClick={handleAutoGeolocalization}>
        Position actuelle
      </button>
      <button type="button" className="rounded border-1" disabled={isInvalidLocalization} onClick={handleModifyProduct}>
        Save localization
      </button>
    </Modal>
  ), [handleAutoGeolocalization, handleLocalizationInputX, handleLocalizationInputY, handleModifyProduct, isGeolocalizationModalOpen, isInvalidLocalization, x, y])

  if (!user) return null
  if (!products) return null

  return (
    <div className="container d-flex flex-column px-5">
      <h1 id="title" className="mb-3">
        Bienvenue {user.username}
      </h1>
      <div className="products">
        <div className="numberOfProducts mb-4">Nombre total de produits : {products.length}</div>
        <div className="productsList">
          {paginatedProducts.map((product, index) => (
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
        className="loadMore mx-auto border-0 rounded pt-1 pb-1 ps-2 pe-2 mb-4 w-25"
        onClick={handleLoadMore}
      >
        Voir plus...
      </button>
      <MapContainer
        center={[48, 2]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100wh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {products.map((product, index) => (
          <Marker
            key={index}
            position={[product.x, product.y]}
            icon={new Icon({iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]})}
          >
            <Popup>
              <div className="d-flex flex-column">
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {renderProductModal}
      {renderGeolocalizationModal}
    </div>
  )
}

export default Products
