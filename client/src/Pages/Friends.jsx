import React, { useEffect, useState } from 'react'
import batman from '../assets/batman.jpg'
import {UserCircle} from 'lucide-react'
import axios from 'axios'
import defautuser from '../assets/defautuser.png'

const Friends = () => {

    const token = sessionStorage.getItem('token')

    const currentUser = JSON.parse(sessionStorage.getItem('user')) || null

    const [allUsers, setAllUsers] = useState([])
    const [followingIds, setFollowingIds] = useState([])

    const getAllUser = () => {
        axios.get('http://localhost:5000/api/users', {headers : { Authorization: `Bearer ${token}`}})
          .then(res => {
            console.log(res.data)
            setAllUsers(res.data.selectUsers)
            // sync followingIds with latest session user if available
          })
          .catch(err => {
            console.error("Erreur lors de la recuperation des utilisateurs", err);
          })
    }

    const followUser = (id) => {
        axios.patch(`http://localhost:5000/api/users/follow/${id}`, {}, {headers : { Authorization: `Bearer ${token}`}})
          .then(res => {
            console.log(res.data)
            alert("Vous suivez maintenant cet utilisateur !")
            setFollowingIds(prev => [...prev, id])
            sessionStorage.setItem("user", JSON.stringify(res.data.currentUser))
            getAllUser() // Refresh the list of users after following
          })
          .catch(err => {
            console.error("Erreur lors du follow de l'utilisateur", err);
            alert(err.response.data.message || "Erreur lors du follow de l'utilisateur");
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
                       <img src={user.avatar ? `http://localhost:5000${user.avatar}` : defautuser} alt="" />
                       <p className='text-center font-bold'>{user.name}</p>
                   </div>
                  <button
                    onClick={() => followUser(user._id)}
                    className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full ${currentUser && currentUser.following.includes(user._id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentUser && currentUser.following.includes(user._id)}
                  >
                    {<UserCircle className='w-5 h-5' />}
                    {currentUser && currentUser.following.includes(user._id) ? "Suivi(e)" : "Ajouter ami(e)"}
                  </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Friends