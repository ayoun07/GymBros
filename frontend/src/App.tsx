import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Header from './components/header/Header'
function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' Component={Home} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
