import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import dictionary from '../utility/dictionary.json'
import 'react-responsive-modal/styles.css'
import { TileProps } from '../App'
import { green, unused, used, yellow } from '../utility/constants'

const useStore = (solution: string) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
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
    const formattedGuess = [...currentGuess].map((letter) => ({ letter, color: unused }))
    // set green color for right guesses
    formattedGuess.forEach((item, i) => {
      if (solArr[i] === item.letter) {
        formattedGuess[i].color = green
        solArr[i] = null
      }
    })
    // set yellow for letters that are on wrong place and havent
    formattedGuess.forEach((item, i) => {
      if (solArr.includes(item.letter) && item.color !== green) {
        formattedGuess[i].color = yellow
        solArr[solArr.indexOf(item.letter)] = null
      }
    })
    return formattedGuess
  }

  const addNewWord = (guess: string) => {
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

        if (item.color === green) {
          newKeys[item.letter] = green
          return
        }
        if (item.color === yellow && currentColor !== green) {
          newKeys[item.letter] = yellow
          return
        }
        if (item.color === unused && currentColor !== green && currentColor !== yellow) {
          newKeys[item.letter] = used
          return
        }
      })
      return newKeys
    })
  }

  const checkSubmission = (guess: string) => {
    // if dictionary have this word then go forward
    if (dictionary.includes(guess)) {
      // if the word is same as solution
      if (solution === guess) {
        setIsCorrect(true)
        toast.success(solution, { duration: 2500 })
        setTimeout(() => setOpen(true), 3000)
      }
      // Don't do anything if word was guessed once before
      if (history.includes(guess)) {
        toast('Word already guessed', { duration: 3000 })
        return
      }
      // add new word in guesses and colors to usedKeys for keyboard
      addNewWord(guess)
      // format currentGuess
      setCurrentGuess('')
      // on last turn if the current guess is wrong
      if (turn === 5 && !isCorrect) {
        toast.error(solution, { duration: 1000 })
        setTimeout(() => setOpen(true), 1000)
      }
      // increase turn after every try
      setTurn((prev) => prev + 1)
    } else {
      // otherwise show toast the word doesn't exist
      toast.error('Word not found')
    }
  }

  const handleInput = (key: string) => {
    // if its backspace pop up the letter from current guess
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }
    // if its enter then call word submit function
    else if (key === 'Enter') {
      if (currentGuess.length < 5) {
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
    // remove access to keyboard after correct guess
    if (isCorrect || turn > 5) {
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
