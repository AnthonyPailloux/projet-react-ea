
import './App.css'
import Nav from './components/Nav'
import Facts from './pages/Facts'
import View from './pages/View'
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Facts />} />
        <Route path="/facts/:id" element={<View />} />
      </Routes>


      <Nav />
      <h1>Exo sur l'API "veilleapi"</h1>
      <Facts />
      <View id={2} />



    </>
  )
}

export default App

