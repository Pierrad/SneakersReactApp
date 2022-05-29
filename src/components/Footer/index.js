import React from 'react'

import NikeLogo from '../../assets/images/nike-white.svg'
import FacebookIcon from '../../assets/images/facebook.svg'
import InstagramIcon from '../../assets/images/instagram.svg'
import TwitterIcon from '../../assets/images/twitter.svg'

import './styles.css'

const Footer = () => {
  return (
    <div class="footerContainer">
      <div class="footerWrapper">
        <img src={NikeLogo} alt="logo" class="footerLogo" />
        <div class="footerLinks">
          <a href="https://www.facebook.com" class="footerLink">
            <img src={FacebookIcon} alt="facebook icon" class="footerIcon" />
          </a>
          <a href="https://www.instagram.com" class="footerLink">
            <img src={InstagramIcon} alt="instagram icon" class="footerIcon" />
          </a>
          <a href="https://www.twitter.com" class="footerLink">
            <img src={TwitterIcon} alt="twitter icon" class="footerIcon" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer