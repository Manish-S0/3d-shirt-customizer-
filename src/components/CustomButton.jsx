
import { useSnapshot } from 'valtio'
import State from '../store';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({type, title, handleClick, customStyles}) => {

  const snap = useSnapshot(State)
  const generateStyle = (type) => {
    if(type === 'filled'){
      return {
        backgroundColor: `${snap.color}`,
        color: getContrastingColor(snap.color)
      }
    }else if(type === 'outline'){
      return {
        backgroundColor: 'transparent',
        color: `${snap.color}`,
        border: `1px solid ${snap.color}`
      }
    }
  }

  return (
    <button className={`w-fit px-4 py-2.5 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>{title}</button>
  )
}

export default CustomButton