import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./Navbar/navbar.jsx";
import DataGrid from "./DataGrid/dataGrid";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <DataGrid />
    </>
  );
}

export default App
