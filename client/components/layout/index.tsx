import React from 'react'
import Header from '../header'
import Navigation from '../navigation'
import Footer from '../footer'

 const DefaultLayout = ({children}:{
   children: React.ReactNode
 }) => {
  return (
    <>
        <Header />
           <Navigation />
           <main className="min-h-screen bg-gray-50">{children}</main>
           <Footer />
    </>
  )
}
export default DefaultLayout
