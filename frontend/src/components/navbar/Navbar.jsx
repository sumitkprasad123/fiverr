import {useState,useEffect} from 'react'
import { Link, useLocation } from "react-router-dom"
import "./Navbar.scss"

const Navbar = () => {
  const [active,setActive] = useState(false);
  const [open,setOpen] = useState(false);
  const {pathname} = useLocation()
 
  const isActive = () => {
      window.scrollY > 0 ?setActive(true):setActive(false)
  }
  useEffect(() => {
    window.addEventListener("scroll",isActive)
  },[])

  const currentUser = {
      id:1,
      username:"Jhon Doe ",
      isSeller:true
  }
//  const currentUser = null
  
  return (
    <div className={active || pathname !== "/"?'navbar active':'navbar'}>
       <div className="container">
          <div className="logo">
            <Link to="/" className='link'> 
              <span className="text">fiverr</span>
              <span className="dot">.</span>
            </Link>
          </div>
          <div className="links">
              <span>Fiverr Business</span>
              <span>Explore</span>
              <span>English</span>
              <span>Sign In</span>
              {!currentUser?.isSeller && <span>Become a seller</span>}
              {!currentUser && <button  className={active || pathname !== "/"?'button active':'button'}>Join</button>}
              {currentUser && (
                <div className="user" onClick={() => setOpen(!open)}>
                   <img src={"./img/man.png"} alt="" />
                   <span>{currentUser?.username}</span>
                  { open && <div className="option">
                      {
                        currentUser?.isSeller && (
                          <>
                            <Link className='link' to="/myGigs">Gigs</Link>
                            <Link className='link' to="/add">Add New Gig</Link>
                          </>
                        )
                      }
                      <Link className='link' to="/orders">Order</Link>
                      <Link className='link' to="/messages">Messages</Link>
                      <Link className='link' to="/">Logout</Link>
                   </div>}
                </div>
              )}
          </div>   
       </div>

       {(active || pathname !== "/") &&<>
       <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
       </>
       }
    </div>
  )
}

export default Navbar