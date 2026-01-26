import React from 'react'
import ProfilSidebar from '../Components/ProfilSidebar'
import Display from '../Components/Display'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex w-full min-h-screen'>
      <div className="w-[20%] max-h-screen overflow-y-auto">
        <ProfilSidebar/>
      </div>
      <div className='w-[80%]'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home