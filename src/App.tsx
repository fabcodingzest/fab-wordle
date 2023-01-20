import { useEffect, useState } from 'react'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'

export interface TileProps {
  key: string
  color: string
}

function App() {
  const solution = words[Math.floor(Math.random() * words.length)]
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<TileProps[][]>([])

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
    setGuesses((prev) => [...prev, formattedGuess])
    setCurrentGuess('')
    setTurn((prev) => prev + 1)
  }

  const handleInput = (key: string) => {
    // if its backspace pop up the letter from current guess
    console.log(key)
    if (turn < 6) {
      if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }
      // if its enter then call word submit function
      else if (key === 'Enter') {
        if (currentGuess.length === 5) {
          checkSubmission(currentGuess)
        }
      }
      // if its a letter then set it in current guess
      else if (/^[a-zA-Z]$/.test(key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + key)
        }
      }
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
    <div className='flex min-h-screen flex-col'>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight flex flex-1 flex-col justify-center gap-2'>
        <Board />
        <Keypad handleInput={handleInput} />
      </main>
      <Footer />
    </div>
  )
}

export default App
