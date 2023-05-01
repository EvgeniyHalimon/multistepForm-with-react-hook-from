import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FormStep1, FormStep2, FormStep3, Result } from './components/Form'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormStep1/>}/>
          <Route path='/step2' element={<FormStep2/>}/>
          <Route path='/step3' element={<FormStep3/>}/>
          <Route path='/result' element={<Result/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
