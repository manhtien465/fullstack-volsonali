import React from 'react'
import Header from '../header'
import Navigation from '../navigation'
import Footer from '../footer'
import { getGlobalPageDataFetch } from '@/features/static/service'
import { notFound } from 'next/navigation'

 const DefaultLayout = async ({children}:{
   children: React.ReactNode
 }) => {
	const data = await getGlobalPageDataFetch();
	if (!data) notFound();

	const { topNav, footer } = data.data;
  return (
    <>
        <Header data={topNav}  />
           <Navigation />
           <main className="min-h-screen bg-gray-50">{children}</main>
           <Footer  data={footer}/>
    </>
  )
}
export default DefaultLayout
