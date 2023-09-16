import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//imports
import Navbar from "./Navbar/navbar.jsx";
import DataGrid from "./DataGrid/dataGrid";
import { slides } from "./Banner/carouselData.json";
import { Carousel } from "./Banner/carousel";
import OtherCompanies from "./OtherCompanies/otherCompanies";

function App() {
  return (
    <>
      <Navbar />
      <Carousel data={slides} />
      <OtherCompanies />
      <DataGrid />
    </>
  );
}

export default App
