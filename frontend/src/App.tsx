import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' Component={Home} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
