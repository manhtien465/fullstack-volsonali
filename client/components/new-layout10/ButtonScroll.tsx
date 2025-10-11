"use client"
import React from 'react'

export const ButtonScroll = () => {
	const handleScroll = () => {
    const section = document.getElementById('play')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
	return (
		<div className='bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-yellow-600 transition-colors text-sm' onClick={handleScroll}>Play Now</div>

	)
}
