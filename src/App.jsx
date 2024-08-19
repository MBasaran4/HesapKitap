import { useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <Analytics/>
      <MainPage/>
    </>
  )
}

export default App
