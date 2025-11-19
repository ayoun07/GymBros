import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Nutrition from './pages/nutrition/Nutrition'
import NutritionDetails from './pages/nutrition/[id]'
function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/nutrition' Component={Nutrition} />
      <Route path='/nutrition/:id' Component={NutritionDetails} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
