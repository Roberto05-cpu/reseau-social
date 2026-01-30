import React from 'react'
import watch from "../assets/watch.jpg";
import { Edit } from 'lucide-react';

const Settings = () => {

    const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto flex justify-center items-center">
        <div className='w-[900px] h-[80vh] bg-white rounded-[20px] p-5'>
            <h1 className='text-3xl font-bold text-center'>Mon profil</h1>
            <div className='flex items-center gap-2 mt-5'>
                <img src={watch} className='w-20 h-20 rounded-[100%]' alt="" />
                <div>
                    <p className='font-bold'>{user.name}</p>
                    <span>{user.email}</span>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='font-bold text-[20px]'>Informations personnelles</h2>
                <div className='grid grid-cols-2 gap-5 mt-5'>
                    <div>
                        <p className='opacity-65'>Nom d'utilisateur</p>
                        <span className='font-bold'>{user.name}</span>
                    </div>
                    <div>
                        <p className='opacity-65'>Genre</p>
                        <span className='font-bold'>{user.gender}</span>
                    </div>
                    <div>
                        <p className='opacity-65'>Adresse e-mail</p>
                        <span className='font-bold'>{user.email}</span>
                    </div>
                    <div>
                        <p className='opacity-65'>Date de naissance</p>
                        <span className='font-bold'>{user.date}</span>
                    </div>
                    <div className='flex gap-5'>
                        <div>
                            <p className='opacity-65'>Bio</p>
                            <span className='font-bold'>{user.bio? user.bio : <span className='opacity-50'>Pas de bio</span>}</span>
                        </div>
                        <Edit/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings