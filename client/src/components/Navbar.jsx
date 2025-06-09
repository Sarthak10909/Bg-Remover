import React from 'react'
import { asset } from '../assets/assets'
import {Link} from 'react-router-dom'
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'

export const Navbar = () => {

  const {openSignIn} = useClerk()
  const { isSignedIn, user } = useUser()

  return (
    <div className = 'flex items-centre justify-between mx-4 py-3 lg:mx-44 '>

      <Link to = '/'><img className = 'w-32 sm:w-44' src={asset.logo} alt="" /></Link>
        {
          isSignedIn 
          ? <div>
            <UserButton />
          </div>
          : <button onClick = {() => openSignIn({})} className = 'bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'>
          Get Started <img className = 'w-3 sm-w-4' src={asset.arrow_icon} alt="" />
          </button>
        }
    </div>
  )
}

export default Navbar

{/* <Link to = '/'><img className = 'w-32 sm:w-44' src={asset.logo} alt="" /></Link>
        {
          isSignedIn 
          ? <div>
            <UserButton />
          </div>
          : <button onClick = {() => openSignIn({})} className = 'bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'>
          Get Started <img className = 'w-3 sm-w-4' src={asset.arrow_icon} alt="" />
          </button>
           
        } */}