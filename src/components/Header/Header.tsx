interface HeaderProps {
  text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <header className='bg-primary bg-violet-dark py-2 text-center text-2xl font-bold text-white'>
      <h1>{text}</h1>
    </header>
  )
}

export default Header
