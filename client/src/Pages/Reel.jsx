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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-gray-300 grid grid-cols-3">
        <div></div>
        <div className="p-3.5  rounded-2xl items-center justify-center w-full h-full snap-start relative">
          <video
            src={chevre}
            className="h-full object-cover rounded-2xl"
            autoPlay
            loop
            muted
            width={500}
          />
        </div>
          {/* Actions */}
          <div className="flex items-center">
            <div>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99a1af" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
                <p className="text-gray-400">18.6k</p>
              </div>

              <div className="flex items-center gap-1.5 mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99a1af" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg>
                <p className="text-gray-400">3k</p>
              </div>

              <div className="flex items-center gap-1.5 mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99a1af" className="bi bi-reply transform scale-x-[-1]" viewBox="0 0 16 16">
                  <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z"/>
                </svg>
              </div>

              <div className="flex items-center gap-1.5 mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99a1af" className="bi bi-repeat" viewBox="0 0 16 16">
                  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                </svg>
              </div>

            </div>
          </div>

          {/* Infos */}
          {/* <div className="absolute left-4 bottom-10 text-white">
            <p className="font-bold">Roberto</p>
            <p>mon premier montage</p>
          </div> */}
    </div>
  )
}

export default Reel
