import React from 'react'
import { Pixels } from '../Pixels';

import './Background.css';



const Background = () => {
  return (
    <div className='bkg'>
        <Pixels />
        <div className='white-bkg'></div>
    </div>
  )
}

export default Background