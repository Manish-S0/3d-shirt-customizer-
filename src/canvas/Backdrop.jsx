import{useRef} from 'react'

import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'


const Backdrop = () => {

  const shadows = useRef()
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.45}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0,0,-0.14]}>

        <RandomizedLight
          amount={8}
          radius={9}
          intensity={1.95}
          ambient={0.5}
          position={[5,5,-10]}
        
        />

        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.15}
          position={[-5,5,-5]}
        />

    </AccumulativeShadows>
  )
}

export default Backdrop