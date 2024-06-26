import {useState} from 'react'
import { useSnapshot } from 'valtio'
import { AnimatePresence,motion } from 'framer-motion'
import State from '../store';

import {  reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import state from '../store';

import {downloadCanvasToImage} from '../config/helpers'


 
const Customizer = () => {
  const snap=useSnapshot(State);

  const [file, setFile] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState('');

  const [activeFilterTab, setActiveFilterTab] = useState({logoShirt: true, stylishShirt: false});

  const handleDownload = () => {
    downloadCanvasToImage();
  };
  

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker 
        file={file} setFile={setFile} readFile={readFile}/>
      
      default:
        return null;
    }
  };

 
  

  const handleDecalsUpdate = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  };
  const handleActiveFilterTab=(tabName)=>{
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture=!activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture=true;
        state.isFullTexture=false;
    }
    setActiveFilterTab((prevState)=>({...prevState,[tabName]:!prevState[tabName]}))
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecalsUpdate(type, result);
      setActiveEditorTab("");//to reset
    });
  };

  return (
    
    <AnimatePresence>
      
      {!snap.intro && (
        <>
        <motion.div key='custom' className='absolute z-10 top-0 left-1' {...slideAnimation('left')}>
            
          <div className='flex items-center min-h-screen'>
            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab) => (
                <Tab key={tab.name} tab={tab} 
                handleClick={() => setActiveEditorTab(tab.name)}/>
              ))}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>
        <motion.div 
          className='absolute z-10 top-5 left-5' 
          {...fadeAnimation}>
          <CustomButton type='filled' title='Go Back' handleClick={() => State.intro = true}
          customStyles={'w-fit px-4 py-2.5 rounded-md mt-5'}/>

        </motion.div>
    
        <motion.div 
          className='absolute z-10 top-20 left-5' 
          {...fadeAnimation}>
          <CustomButton type='filled' title='Download' handleClick= {handleDownload}
          customStyles={'w-fit px-4 py-2.5 rounded-md mt-5'}/>

        </motion.div>
        

        <motion.div className='filtertabs-container' {...slideAnimation('up')}>
          {FilterTabs.map((tab) => (
            <Tab key={tab.name} tab={tab} 
            isfilterTab
            isActiveTab={activeFilterTab[tab.name]}
            handleClick={() => handleActiveFilterTab(tab.name)}/>
          ))}
        </motion.div>
        
        </>
        
      )}
    </AnimatePresence>
    
  )
}

export default Customizer