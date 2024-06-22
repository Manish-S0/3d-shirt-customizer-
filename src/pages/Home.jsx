
import {motion,AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'

import {headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation} from '../config/motion'
import State from '../store';
import CustomButton from '../components/CustomButton';
const Home = () => {
  const snap=useSnapshot(State);
  return (
    
    <AnimatePresence>
      {snap.intro && (
        <motion.div className='home' {...slideAnimation('left')}>
          <motion.header {...headContainerAnimation}>
            <img src='./threejs.png' alt='logo' className='w-8 h-8 object-contain'/>
          </motion.header>
            <motion.div className='home-content' {...headContentAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='head-text'>
                  LET'S <br className='xl:block hidden'/> BUILD SOMETHING
                </h1>
              </motion.div>
              <motion.div {...headTextAnimation} className='flex flex-col gap-2'>
                <p className='max-w-md font-normal text-gray-600'>
                  Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                </p>
                <CustomButton type='filled' title='Customize It' handleClick={() => State.intro = false}
                 className='w-fit px-4 py-2.5 rounded-md'/>
                  
                
              </motion.div>
              
            </motion.div>
          
        </motion.div>
      )}

    </AnimatePresence>
  )
}

export default Home