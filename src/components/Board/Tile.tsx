import { TileProps } from '../../App'

const Tile = ({ letter, color }: TileProps) => {
  return (
    <div className={`border-grey-med flex h-10 w-10 items-center justify-center border-2 ${color}`}>
      {letter}
    </div>
  )
}

export default Tile
