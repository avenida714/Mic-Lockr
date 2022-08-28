import React from 'react'

import './flexPage.css'

import sm7b from './sm7b.jpeg'

function FlexPage() {
  return (
    <div className='homeMicContainer'>
      <img className='sm7b-Flex' src={sm7b} alt="sm7b" width="100%"></img>
      <div className='centered'>
      <h1 id='title'>mic lockr</h1>
      <h3 id='catchPhrase'>flex your vocal cords</h3>
      </div>
    </div>
  )
}

export default FlexPage
