import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Board, Footer, Header, Keypad } from './components'
import words from './utility/words.json'
import dictionary from './utility/dictionary.json'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

export interface TileProps {
  letter: string
  color?: string
}

const solution = words[Math.floor(Math.random() * words.length)]
function App() {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  console.log(solution)
  const [guesses, setGuesses] = useState([...Array<TileProps[]>(6)])
  const [isCorrect, setIsCorrect] = useState(false)
  const [keyboardEnable, setKeyboardEnable] = useState(true)
  const [open, setOpen] = useState(false)

  const onCloseModal = () => setOpen(false)

  const formatGuess = () => {
    const solArr: (string | null)[] = [...solution]
    const formattedGuess = [...currentGuess].map((letter) => ({ letter, color: 'bg-grey-med' }))

    // set green color for right guesses
    formattedGuess.forEach((item, i) => {
      if (solArr[i] === item.letter) {
        formattedGuess[i].color = 'bg-green-400'
        solArr[i] = null
      }
    })

    // set yellow for letters that are on wrong place and havent
    formattedGuess.forEach((item, i) => {
      if (solArr.includes(item.letter) && item.color !== 'bg-green-400') {
        formattedGuess[i].color = 'bg-yellow-400'
        solArr[solArr.indexOf(item.letter)] = null
      }
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
        toast.success(solution, { duration: 2500 })
        setTimeout(() => setOpen(true), 3000)
      }
      // format the currentGuess to detailed object array
      const formattedGuess = formatGuess()
      setGuesses((prev) => {
        const newGuesses = [...prev]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setCurrentGuess('')
      setTurn((prev) => prev + 1)
    } else {
      // otherwise show toast the word doesn't exist
      toast.error('Word not found')
    }
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
      if (turn > 5) {
        // setIsCorrect(true)
        return
      } else if (currentGuess.length < 5) {
        // if less then 5 then show toast incomplete word or something
        toast('Not enough letters')
      } else {
        checkSubmission(currentGuess)
        return
      }
    }
    // if its a letter then set it in current guess
    else if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => (prev + key).toLowerCase())
      }
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    const key = e.key
    if (key) handleInput(key)
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setKeyboardEnable(false)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setOpen(true)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return (
    <div className='flex min-h-screen flex-col'>
      <Header text={'Fabordle'} />
      <main className='bg-grey-light dark:bg-blue-midnight flex flex-1 flex-col justify-center gap-2'>
        <Board guesses={guesses} turn={turn} currentGuess={currentGuess} />
        <Keypad handleInput={handleInput} keyboardEnable={keyboardEnable} />
      </main>
      <Footer />
      <Toaster />
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: 'rounded p-6', closeButton: 'top-0 p-0.5 right-0' }}
      >
        <div className='text-center'>
          <h2 className='pt-2 pb-4 text-xl font-bold'>
            {isCorrect ? 'Congrats, You guessed it right!' : 'Aw! Better luck next time'}
          </h2>
          <p className=''>
            Right answer is <span className='font-bold text-green-700'>{solution}</span>
          </p>
          <p>
            {isCorrect
              ? `It took you ${turn === 1 ? ' 1 turn' : `${turn} turns`} to get it right`
              : '6 turns were not enough? You suck bruh lol!'}
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default App
