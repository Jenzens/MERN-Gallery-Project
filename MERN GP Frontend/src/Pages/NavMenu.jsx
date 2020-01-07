import React from 'react'
import { Link } from 'react-router-dom'

function NavMenu () {
    return (
       <nav className="nav">
           <ul className="nav-links">
               <Link to='/home'><li>Home</li></Link>
               <Link to='/gallery'><li>Gallery</li></Link>
               <Link to='/user'><li>Manage</li></Link>
           </ul>
       </nav>
    )
}

export default NavMenu
