import { Clock, MessageCircle, Search , MoreHorizontal, Heart, Send, Bookmark, Bell, PlusCircle} from 'lucide-react'
import React from 'react'
import  watch from '../assets/watch.jpg'
import HeadComp from '../Components/HeadComp'
import { Link } from 'react-router-dom'

const Feed = () => {
  return (
    <div className='bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto'>
        <HeadComp/>
        <div className='mt-5'>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-2xl'>Friends</h2>
                <Link to="/home/friends"><PlusCircle className='w-8 h-8 text-blue-500 cursor-pointer' /></Link>
            </div>
            <div className='flex gap-5 overflow-x-auto max-w-full mt-3 pb-3'>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>

                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
                <div className='flex-shrink-0'>
                    <img src={watch} className='w-26 h-26 rounded-[100%] flex-shrink-0' alt="" />
                    <p className='text-center font-bold'>Alan</p>
                </div>
            </div>
        </div>
        <div>
            <h2 className='font-bold text-2xl'>Feed</h2>
            <div className='mt-5 flex gap-3'>
                <div className='bg-white w-[400px] rounded-[10px] p-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={watch} className='w-16 h-16 rounded-[100%]' alt="" />
                            <div>
                                <p className='font-bold'>Sonya Louena</p>
                                <span>Dubai</span>
                            </div>
                        </div>
                        <MoreHorizontal/>
                    </div>
                    <img src={watch} alt="" />
                    <div className='mt-1 flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <Heart />
                            <MessageCircle/>
                            <Send />
                        </div>
                        <Bookmark className='mr-5' />
                    </div>
                    <div>
                        <p>Liked by <strong>Abhinav_khare</strong> and <strong>124k others</strong></p>
                        <p>Comment du user</p>
                    </div>
                </div>
                <div className='bg-white w-[400px] rounded-[10px] p-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={watch} className='w-16 h-16 rounded-[100%]' alt="" />
                            <div>
                                <p className='font-bold'>Sonya Louena</p>
                                <span>Dubai</span>
                            </div>
                        </div>
                        <MoreHorizontal/>
                    </div>
                    <img src={watch} alt="" />
                    <div className='mt-1 flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <Heart />
                            <MessageCircle/>
                            <Send />
                        </div>
                        <Bookmark className='mr-5' />
                    </div>
                    <div>
                        <p>Liked by <strong>Abhinav_khare</strong> and <strong>124k others</strong></p>
                        <p>Comment du user</p>
                    </div>
                </div>
                <div className='bg-white w-[400px] rounded-[10px] p-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <img src={watch} className='w-16 h-16 rounded-[100%]' alt="" />
                            <div>
                                <p className='font-bold'>Sonya Louena</p>
                                <span>Dubai</span>
                            </div>
                        </div>
                        <MoreHorizontal/>
                    </div>
                    <img src={watch} alt="" />
                    <div className='mt-1 flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <Heart />
                            <MessageCircle/>
                            <Send />
                        </div>
                        <Bookmark className='mr-5' />
                    </div>
                    <div>
                        <p>Liked by <strong>Abhinav_khare</strong> and <strong>124k others</strong></p>
                        <p>Comment du user</p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Feed