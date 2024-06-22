
import { useSnapshot } from 'valtio'
import { SketchPicker } from 'react-color'

import State from '../store'

const ColorPicker = () => {

  const snap=useSnapshot(State)
  return (
    <div>
      <SketchPicker className='absolute left-full ml-3 top-0.5'
        color={snap.color}
        // disableAlpha
        onChange={(color) => State.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker