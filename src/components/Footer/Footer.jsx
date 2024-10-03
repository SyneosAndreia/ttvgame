import React from 'react'

import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (        
    <div className='footer'>
        <p>*Total Tumor Volume</p>
        <img src={logo} alt="logo" />
    </div>
  )
}

export default Footer
