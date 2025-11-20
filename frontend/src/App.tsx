import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Nutrition from './pages/nutrition/Nutrition'
import NutritionDetails from './pages/nutrition/[id]'
import ShoppingCartPage from './components/cart/ShoppingCartPage'
import Clothe from './pages/clothe/Clothe'
import Register from './pages/register/register'
function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/nutrition' Component={Nutrition} />
      <Route path='/vetement' Component={Clothe} />
      <Route path='/vetement/:id' Component={NutritionDetails} />
      <Route path='/nutrition/:id' Component={NutritionDetails} />
      <Route path='/panier' Component={ShoppingCartPage} />
        <Route path="/inscription" Component={Register} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App
