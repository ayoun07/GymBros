import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Home} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
