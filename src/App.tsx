import { useState } from 'react'
import { Board, Footer, Header, Keypad } from './components'

interface KeyState {
  key: string
  color: string
}

function App() {
  return (
    <>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight'>
        <Board />
        <Keypad />
      </main>
      <Footer />
    </>
  )
}

export default App
