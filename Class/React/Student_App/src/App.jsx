import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import StudentInfo from './studentInfo'
import Counter from './Counter'; 
import Navbar from './components/Navbar'

import { BrowserRouter } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
      
  //     <StudentInfo fname="Priyanka" age="21" course="AIML"/>  
  //     <Counter/>
  //   </>
  // )
  return(
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/about" element = {<About />}/>
        <Route path = "/contact" element = {<Contact />}/>

      </Routes>
      
    </BrowserRouter>
  )


}

export default App