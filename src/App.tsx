import { useState } from 'react'
import { Board, Footer, Header, Keypad } from './components'

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  return (
    <>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight'>
        <Board />
        <p className='py-2 text-center'>Current Guess - {currentGuess}</p>
        <Keypad setCurrentGuess={setCurrentGuess} />
      </main>
      <Footer />
    </>
  )
}

export default App
