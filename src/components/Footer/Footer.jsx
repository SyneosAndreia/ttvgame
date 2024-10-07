import React from 'react'

import logo from '../../assets/logo.png';
import './Footer.css';

const Footer = ({footnote}) => {
  return (        
    <div className={'footer ' + `${!footnote ? 'flexEnd' : ''}`}>
      {footnote && 
        <p>*Total Tumor Volume</p>
      }
        <img src={logo} alt="logo" />
    </div>
  )
}

export default Footer
