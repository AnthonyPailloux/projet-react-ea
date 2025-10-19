
import './App.css'
import Home from './pages/home'
import View from './pages/View'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <h1>Exo sur l'API "veilleapi"</h1>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facts/:id" element={<View />} />
      </Routes>
    </>
  )
}

export default App

