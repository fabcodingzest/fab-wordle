import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import dictionary from '../utility/dictionary.json'
import 'react-responsive-modal/styles.css'
import { TileProps } from '../App'

const useStore = (solution: string) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  console.log(solution)
  const [guesses, setGuesses] = useState([...Array<TileProps[]>(6)])
  const [isCorrect, setIsCorrect] = useState(false)
  const [keyboardEnable, setKeyboardEnable] = useState(true)
  const [history, setHistory] = useState<string[]>([])
  const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const onCloseModal = () => {
    setOpen(false)
  }

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
      if (history.includes(guess)) {
        toast('Word already guessed', { duration: 3000 })
        return
      }
      const formattedGuess = formatGuess()
      setGuesses((prev) => {
        const newGuesses = [...prev]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setHistory((prev) => [...prev, guess])
      setUsedKeys((prev) => {
        const newKeys = { ...prev }
        formattedGuess.forEach((item) => {
          const currentColor = newKeys[item.letter]

          if (item.color === 'bg-green-400') {
            newKeys[item.letter] = 'bg-green-400'
            return
          }
          if (item.color === 'bg-yellow-400' && currentColor !== 'bg-green-400') {
            newKeys[item.letter] = 'bg-yellow-400'
            return
          }
          if (
            item.color === 'bg-grey-med' &&
            currentColor !== 'bg-green-400' &&
            currentColor !== 'bg-yellow-400'
          ) {
            newKeys[item.letter] = 'bg-grey-darkest'
            return
          }
        })
        return newKeys
      })
      setCurrentGuess('')
      if (turn === 5) {
        toast.error(solution, { duration: 1000 })
        setTimeout(() => setOpen(true), 1000)
      }
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

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  return {
    guesses,
    turn,
    currentGuess,
    usedKeys,
    handleInput,
    onCloseModal,
    isCorrect,
    open,
    keyboardEnable,
  } as const
}

export default useStore
