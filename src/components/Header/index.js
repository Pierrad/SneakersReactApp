import React, { useCallback, useMemo, useState } from 'react'

import { history } from '../../App'
import useWindowSize from '../../hooks/useWindowSize'

import AppLogo from '../../assets/images/logo.svg'
import ShoppingCart from '../../assets/images/shopping_cart.svg'
import UserImg from '../../assets/images/user.svg'
import ReturnIcon from '../../assets/images/return.svg'
import HomeIcon from '../../assets/images/home.svg'
import SneakersIcon from '../../assets/images/sneakers.png'
import BurgerIcon from '../../assets/images/burger.svg'

import './styles.css'

function Header() {
  const [isBurgerMobileMenuOpen, setIsBurgerMobileMenuOpen] = useState(false)
  const { width, } = useWindowSize()

  const handleOpenBurgerMenu = useCallback(() => {
    setIsBurgerMobileMenuOpen(!isBurgerMobileMenuOpen)
  }, [isBurgerMobileMenuOpen])

  const redirectToLandingPage = useCallback(() => {
    history.push('/')
    handleOpenBurgerMenu()
  }, [handleOpenBurgerMenu])

  const redirectToUserPage = useCallback(() => {
    history.push('/user')
    handleOpenBurgerMenu()
  }, [handleOpenBurgerMenu])

  const redirectToProductsPage = useCallback(() => {
    history.push('/products')
    handleOpenBurgerMenu()
  }, [handleOpenBurgerMenu])

  const checkMobileRoute = (route) => {
    if (history.location.pathname === route) return true
    return false
  }

  const renderDesktop = () => {
    return (
      <div className="headerContainer">
        <img src={AppLogo} alt="logo" className="app logo" onClick={redirectToLandingPage} />
        <div className="headerLinks">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a id="home" onClick={redirectToLandingPage} className="headerLink">Accueil</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a id="product" onClick={redirectToProductsPage} className="headerLink">Produits</a>
        </div>
        <div className="headerUser">
          <img src={ShoppingCart} alt="shopping cart" className="shopping cart logo" />
          <img src={UserImg} alt="avatar" className="user logo" onClick={redirectToUserPage} />
        </div>
      </div>
    )
  }

  const renderMobile = useMemo(() => {
    return (
      <div>
        <div className={`headerMobileLinks ${isBurgerMobileMenuOpen ? 'show': ''}`}>
          <img src={ReturnIcon} alt="return icon" className="returnIcon" id="returnIcon" onClick={handleOpenBurgerMenu} />
          <div className="headerMobileLinkBox">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a id="home" onClick={redirectToLandingPage} className={`headerMobileLink ${checkMobileRoute('/') ? 'active' : ''}`}>
              <img src={HomeIcon} alt="home icon" className="mobileLogoLink" />
              <p>Accueil</p>
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a id="product" onClick={redirectToProductsPage} className={`headerMobileLink ${checkMobileRoute('/products') ? 'active' : ''}`}>
              <img src={SneakersIcon} alt="home icon" className="mobileLogoLink2" />
              <p>Produits</p>
            </a>
          </div>
        </div>
        <div className="headerMobileContainer">
          <img src={BurgerIcon} alt="burger icon" className="burgerIcon" id="burgerIcon" onClick={handleOpenBurgerMenu} />
          <img src={AppLogo} alt="logo" className="logoMobile" onClick={redirectToLandingPage} />
          <div className="headerMobileUser">
            <img src={ShoppingCart} alt="shopping cart" className="mobileIcon" />
            <img src={UserImg} alt="avatar" className="mobileIcon" onClick={redirectToUserPage} />
          </div>
      </div>
    </div>
    )
  }, [handleOpenBurgerMenu, isBurgerMobileMenuOpen, redirectToLandingPage, redirectToProductsPage, redirectToUserPage])

  return (
    <div className="header">
      {width > 768 ? renderDesktop() : renderMobile}
    </div>
  )
}

export default Header
