export interface TileProps {
  letter: string
  color?: string
  animation?: string
}

const Tile = ({ letter, color, animation }: TileProps) => {
  return (
    <div
      className={`${
        color ? color : 'border-grey-dark'
      } font-sm text-bold flex h-10 w-10 items-center justify-center border-2 transition dark:text-white ${animation}`}
    >
      {letter.toUpperCase()}
    </div>
  )
}

export default Tile
