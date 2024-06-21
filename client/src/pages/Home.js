import React from 'react'
import Announcement from '../components/Announcement'
import Category from '../components/Category'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import Slider from '../components/Slider';
function Home() {
  return (
    <>
    {/* <div>Home</div> */}
    <Announcement/>
    <Navbar/>
    <Slider/>
    <Category/>
    {/* <Products/> */}
    <Newsletter/>
    <Footer/>
    </>
    
  )
}

export default Home;