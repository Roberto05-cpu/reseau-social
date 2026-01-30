import React, { useEffect, useState } from 'react'
import batman from '../assets/batman.jpg'
import {UserCircle} from 'lucide-react'
import axios from 'axios'

const Friends = () => {

    const token = sessionStorage.getItem('token')

    const [allUsers, setAllUsers] = useState([])

    const getAllUser = () => {
        axios.get('http://localhost:5000/api/users', {headers : { Authorization: `Bearer ${token}`}})
          .then(res => {
            console.log(res.data)
            setAllUsers(res.data.selectUsers)
          })
          .catch(err => {
            console.error("Erreur lors de la recuperation des utilisateurs", err);
          })
    }

    useEffect(() => {
        getAllUser()
    }, [])

  return (
    <div className='bg-gray-200 p-5 max-h-screen h-screen overflow-y-auto'>
        <h2 className='font-bold text-2xl'>Recherche des amis</h2>
        <div className='grid grid-cols-3 gap-5'>
            {allUsers.map((user, i) => (
                <div key={i} className='flex flex-col items-center gap-2 mt-5 p-3 bg-white rounded-lg'>
                   <div>
                       <img src={batman} alt="" />
                       <p className='text-center font-bold'>{user.name}</p>
                   </div>
                   <button className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full'><UserCircle className='w-5 h-5' />Ajouter ami(e)</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Friends