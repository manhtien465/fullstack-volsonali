'use client'
import React, { useEffect, useState } from 'react'
import ModalConfirm from "./modal/ModalConfirm";
import Overlay from "./overlay";
const Sponsor = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showAdOverlay, setShowAdOverlay] = useState(false)
    const [countdown, setCountdown] = useState(5)
    const [showExitButton, setShowExitButton] = useState(false)
    // const [url, setUrl] = useState('')

    const handleUnlockClick = () => {
      // setUrl(url)
      setShowConfirmDialog(true)
    }
    useEffect(() => {
      let timer: NodeJS.Timeout
      if (showAdOverlay && countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1)
        }, 1000)
      } else if (showAdOverlay && countdown === 0) {
        setShowExitButton(true)
      }
      return () => clearTimeout(timer)
    }, [showAdOverlay, countdown])

    const handleConfirmYes = () => {
    setShowConfirmDialog(false)
    setShowAdOverlay(true)
    setCountdown(15)
    setShowExitButton(false)
  }

  const handleConfirmNo = () => {
    setShowConfirmDialog(false)
  }

  const handleExitAd = () => {
    setShowAdOverlay(false)
    setCountdown(15)
    setShowExitButton(false)
    // Here you would redirect to the official site
    // setTimeout(() => {
    //    window.open(url)
    // }, 1000);
   
  }
  return (
    <div className="max-w-xl mx-auto border rounded-lg p-4 shadow-sm bg-white">
      {/* Sponsored label */}
      <p className="text-xs text-gray-400 mb-2">Sponsored Content</p>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Access our exclusive HTML5 game collection
      </h2>

      {/* Button */}
      <div className="w-full text-center">
        <button className="w-2/3 mx-auto bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-indigo-800 transition block" onClick={()=>handleUnlockClick()}>
          Tap to Continue 🔒
          <p className="text-xs font-normal mt-1">
            Watch an ad to unlock all HTML5 games
          </p>
        </button>
      </div>
      {showConfirmDialog && (
       <ModalConfirm handleConfirmNo={handleConfirmNo} handleConfirmYes={handleConfirmYes}/>
      )}
      {showAdOverlay && (
         <Overlay showExitButton={showExitButton} countdown={countdown} handleExitAd={handleExitAd}></Overlay>
      )}
    </div>
  )
}

export default Sponsor
