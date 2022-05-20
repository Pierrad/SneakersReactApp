import React from 'react'
import PropTypes from 'prop-types'

import WarningIcon from '../../assets/images/warning.svg'

import './styles.css'

const Product = (props) => {
  const { id, name, image, price, owner, brand, x, y, onProductClick, onGeolocalizationClick } = props;

  const handleProductClick = () => {
    onProductClick(id);
  }

  const handleGeolocalizationModal = () => {
    onGeolocalizationClick(id);
  }

  return (
    <div className="product w-100 d-flex flex-column flex-md-row mb-4 pb-2 position-relative">
      <div className="productImage me-3" role="button" data-product={id} onClick={handleProductClick}>
        <img className="rounded h-auto" width="150px" src={image} alt={name} />
      </div>
      <div className="productDetails w-100 d-flex flex-column justify-content-between mt-3 pb-3">
        <h2 className="mb-3">{name}</h2>
        <div className="productMeta d-flex flex-column flex-md-row align-content-start align-items-md-center justify-content-between mb-2">
          <p className="productId mb-2 mb-md-0">{id}</p>
          <p className="productOwner mb-2 mb-md-0">{owner}</p>
          <p className="productPrice mb-2 mb-md-0 p-2 rounded">{price}</p>
        </div>
        <p className="productBrand mb-0 rounded pt-1 pb-1 ps-2 pe-2 mb-2">{brand}</p>
      </div>
      {!x && !y && (
        <div id="warningBox" className="position-absolute bottom-0 end-0 mb-2 me-1" data-product={id} onClick={handleGeolocalizationModal}>
          <img src={WarningIcon} alt="warningIcone" height="50px" width="50px" />
        </div>
      )}
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  owner: PropTypes.string,
  brand: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
  onProductClick: PropTypes.func,
  onGeolocalizationClick: PropTypes.func
}

export default Product