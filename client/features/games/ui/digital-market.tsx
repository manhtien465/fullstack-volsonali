'use client'
import React, { useEffect, useState } from "react";
import { Globe, Apple,Bot } from "lucide-react";
import ModalConfirm from "./modal/ModalConfirm";
import Overlay from "./overlay";

interface ReviewTabProps {
    game: any
}
const DigitalMarkets = ({ game }: ReviewTabProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showAdOverlay, setShowAdOverlay] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [showExitButton, setShowExitButton] = useState(false)
  const [url, setUrl] = useState('')
  
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

  const handleUnlockClick = (url:string) => {
    setUrl(url)
    setShowConfirmDialog(true)
  }

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
    setTimeout(() => {
       window.open(url)
    }, 1000);
   
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
            <span className="h-1 w-6 bg-indigo-700 mr-2 rounded"></span>
            See more from the official digital markets
          </h2>
          <p className="text-sm text-gray-500">
            All trademarks belong to their respective owners.
          </p>
        </div>

        {/* Right Section (Buttons) */}
        <div className="flex flex-col gap-3">
        
        { game.link_playstore &&  <button onClick={()=>handleUnlockClick(game.link_playstore)} type="button" className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition text-sm font-medium">
            <Bot className="w-5 h-5" />
            Watch Ad to Unlock Play Store Access
          </button>}

         {game.link_offical_site &&  <button onClick={()=>handleUnlockClick(game.link_offical_site)}  type="button" className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition text-sm font-medium">
            <Globe className="w-5 h-5" />
            Watch Ad to View on Official Site
          </button>}

         { game.link_appstore && <button onClick={()=>handleUnlockClick(game.link_appstore)} type="button" className="flex items-center gap-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition text-sm font-medium">
            <Apple className="w-5 h-5" />
            Watch Ad to Unlock App Store Access
          </button>}
        </div>
      </div>
      {showConfirmDialog && (
       <ModalConfirm handleConfirmNo={handleConfirmNo} handleConfirmYes={handleConfirmYes}/>
      )}
      {showAdOverlay && (
         <Overlay showExitButton={showExitButton} countdown={countdown} handleExitAd={handleExitAd}></Overlay>
          )}
    </div>
  );
};

export default DigitalMarkets;
