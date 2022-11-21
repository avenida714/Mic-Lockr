import React from 'react'

import './flexPage.css'

import sm7b from './sm7b.jpeg'

function FlexPage() {
  return (
    <div className='homeMicContainer' data-aos="fade" data-aos-delay="1500">
      <img className='sm7b-Flex' src={sm7b} alt="sm7b" width="100%"></img>
      <div className='centered'>
      <h1 id='title'>mic lockr</h1>
      <h3 id='catchPhrase'>flex your vocal cords</h3>
      </div>
      <div className='footer'>A PERN Stack Application by Alec Venida</div>
      <div>
        <a href='https://github.com/avenida714'>
        <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/alec-venida-66793979/">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>

    </div>
  )
}

export default FlexPage
