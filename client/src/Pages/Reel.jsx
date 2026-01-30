import { useEffect, useState } from "react"
import axios from "axios"
import chevre from '../assets/chevre.mp4'

const Reel = () => {
  /*const [reels, setReels] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts/reels")
      .then(res => setReels(res.data))
      .catch(err => console.log(err))
  }, []) */

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <div
          className="h-screen snap-start relative"
        >
          <video
            src={chevre}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
          />

          {/* Actions */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-5 text-white">
            ❤️
            💬
            🔄
            ⭐
          </div>

          {/* Infos */}
          <div className="absolute left-4 bottom-10 text-white">
            <p className="font-bold">Roberto</p>
            <p>mon premier montage</p>
          </div>
        </div>
    </div>
  )
}

export default Reel
