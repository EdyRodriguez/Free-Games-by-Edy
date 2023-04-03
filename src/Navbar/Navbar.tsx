import React from 'react'
import './Navbar.css'
// @ts-expect-error
import LogoEdy from '../assets/images/LogoEdy.png'

function Navbar () {

  const handleLogoClick = () => {
    console.log('Logo Clicked')
  }
  return (
    <>
    <div className='Navbar' >
      <div className='Navbar-logo' onClick={() => handleLogoClick() }>
        <a href='http://edyrodriguez.dev'>
          <img className='logo-edy' src={LogoEdy}/>
        </a>

      </div>
    </div>
    </>
  )
}


export default Navbar
