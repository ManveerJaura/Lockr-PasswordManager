import { useState } from 'react'
import Manager from './Components/Manager'
import Navbar from './Components/Navbar'
import Footer from './Components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Manager/>
      <Footer/>
    </>
  )
}

export default App
