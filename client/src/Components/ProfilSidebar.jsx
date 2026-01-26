import React from 'react'
import manofsteel from '../assets/manofsteel.jpg'
import { Home, LogOut, Podcast, Settings, Video } from 'lucide-react'

const ProfilSidebar = () => {
  return (
    <div className='max-h-screen h-screen overflow-y-hidden p-5 border-r'>
        <div>
            <img src="" alt="" />
            <h1>Instagram</h1>
        </div>
        <div className='mt-6'>
            <div className='flex flex-col items-center gap-1 justify-center'>
                <img src={manofsteel} className='w-20 h-20 rounded-[50%] object-cover' alt="" />
                <div className='flex flex-col items-center justify-center'>
                    <h3 className='font-bold text-[17px]'>Abhinav Khare</h3>
                    <p className='text-[14px] opacity-80'>@abhi_navkare</p>
                </div>
            </div>
            <div className='mt-3 grid grid-rows-2'>
                <div className='flex items-center justify-center gap-9'>
                    <p className='font-bold'>472</p>
                    <div>|</div>
                    <p className='font-bold'>12.4K</p>
                    <div>|</div>
                    <p className='font-bold'>228</p>
                </div>
                <div className='w-full flex items-center justify-center gap-10 mt-1'>
                    <p className=''>Posts</p>
                    <p className=''>Followers</p>
                    <p className=''>Following</p>
                </div>
            </div>
            <div className='ml-1 mt-5'>
                <p className='font-semibold'>Abhinav Khare</p>
                <p>UI Designer | Traveler | Lifestyle blogger</p>
            </div>
        </div>
        <div className='ml-1 mt-6'>
            <ul className='flex flex-col gap-5'>
                <li className='flex gap-3'><Home/> Feed</li>
                <li className='flex gap-3'><Video/> Reels</li>
                <li className='flex gap-3'><Podcast/> My Posts</li>
                <li className='flex gap-3'><Settings/> Settings</li>
                <li className='flex gap-3 mt-15'><LogOut/> Logout</li>
            </ul>
        </div>
    </div>
  )
}

export default ProfilSidebar