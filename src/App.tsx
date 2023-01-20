import { useEffect, useState } from 'react'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'

function App() {
  const solution = words[Math.floor(Math.random() * words.length)]
  const [currentGuess, setCurrentGuess] = useState('')

  const formatGuess = (str: string) => {
    const array = str.split('')

    const formattedGuess = array.map((key, i) => {
      let color
      if (solution.indexOf(key) === i) {
        color = 'bg-green-400'
      } else if (solution.includes(key)) {
        color = 'bg-yellow-400'
      } else {
        color = 'bg-grey-med'
      }
      return { key, color }
    })
    return formattedGuess
  }

  const checkSubmission = (guess: string) => {
    const formattedGuess = formatGuess(guess)
    console.log(formattedGuess)
  }

  const handleInput = (key: string) => {
    // if its backspace pop up the letter from current guess
    console.log(key)
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }
    // if its enter then call word submit function
    else if (key === 'Enter') {
      checkSubmission(currentGuess)
    }
    // if its a letter then set it in current guess
    else if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key)
      console.log(currentGuess.length)
    }
  }
  useEffect(() => {
    function handleKeyup(e: KeyboardEvent) {
      const key = e.key
      if (key) handleInput(key)
    }

    document.addEventListener('keyup', handleKeyup)
    return () => document.removeEventListener('keyup', handleKeyup)
  }, [handleInput])

  return (
    <>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight'>
        <Board />
        <p className='py-2 text-center'>Current Guess - {currentGuess}</p>
        <Keypad handleInput={handleInput} />
      </main>
      <Footer />
    </>
  )
}

export default App
