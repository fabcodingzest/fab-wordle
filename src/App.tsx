import { useEffect, useState } from 'react'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'
import dictionary from './utility/dictionary.json'

export interface TileProps {
  letter: string
  color?: string
}

const solution = words[Math.floor(Math.random() * words.length)]
function App() {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array<TileProps[]>(6)])
  const [isCorrect, setIsCorrect] = useState(false)
  const [keyboardEnable, setKeyboardEnable] = useState(true)

  const formatGuess = (str: string) => {
    const array = str.split('')
    const formattedGuess = array.map((letter, i) => {
      let color
      if (solution.indexOf(letter) === i) {
        color = 'bg-green-400'
      } else if (solution.includes(letter)) {
        color = 'bg-yellow-400'
      } else {
        color = 'bg-grey-med'
      }
      return { letter, color }
    })
    return formattedGuess
  }

  const checkSubmission = (guess: string) => {
    // if dictionary have this word then go forward
    if (dictionary.includes(guess)) {
      // if the word is same as solution
      if (solution === guess) {
        console.log(solution === guess)
        setIsCorrect(true)
      }
      // format the currentGuess to detailed object array
      const formattedGuess = formatGuess(guess)
      setGuesses((prev) => {
        const newGuesses = [...prev]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setCurrentGuess('')
      setTurn((prev) => prev + 1)
    } else {
      // otherwise show toast the word doesn't exist
    }
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
        } else {
          // if less then 5 then show toast incomplete word or something
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

  function handleKeyup(e: KeyboardEvent) {
    const key = e.key
    if (key) handleInput(key)
  }
  useEffect(() => {
    if (isCorrect) {
      setKeyboardEnable(false)
      window.removeEventListener('keyup', handleKeyup)
    }

    window.addEventListener('keyup', handleKeyup)
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect])

  return (
    <div className='flex min-h-screen flex-col'>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight flex flex-1 flex-col justify-center gap-2'>
        <p>{solution}</p>
        <Board guesses={guesses} turn={turn} currentGuess={currentGuess} />
        <Keypad handleInput={handleInput} keyboardEnable={keyboardEnable} />
      </main>
      <Footer />
    </div>
  )
}

export default App
