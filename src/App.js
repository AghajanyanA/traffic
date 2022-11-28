import './App.css';
import React, {useCallback, useEffect, useState} from "react";


function App() {
    const [defaultModeState, setDefaultModeState] = useState(true)
    const [workingMode, setWorkingMode] = useState(false)
    const [yellowFlashing, setYellowFlashing] = useState(false)
    const [activeColor, setActiveColor] = useState('go')

    const defaultMode = () => {

        const yellowFlash = setInterval(() => {
            setYellowFlashing(prevState => !prevState)
        },800)

        const stopInterval = () => {
            clearInterval(yellowFlash)
        }

        setDefaultModeState(state => !state)

        setTimeout(() => {
            stopInterval()
            setDefaultModeState(false)
            setWorkingMode(true)
            setActiveColor('red')
        },5000)
    }

    const trafficMode = useCallback(() => {

        if (activeColor === 'red') {
            setTimeout(() => {
                setActiveColor('green')
            }, 10000)
        }
        if (activeColor === 'green') {
            setTimeout(() => {
                setActiveColor('yellow')
            }, 10000)
        }
        if (activeColor === 'yellow') {
            setTimeout(() => {
                setActiveColor('red')
            }, 2000)
        }

    }, [activeColor])
    debugger

    useEffect(() => {

        if (defaultModeState) {
            defaultMode()
        }
        if (workingMode) {
            trafficMode()
        }

    },[defaultModeState, workingMode, trafficMode])


    window.ac = activeColor
  return (
    <div className="App">
      <div className={`redLight ${activeColor === 'red' ? 'red' : ''}`}></div>
      <div className={`yellowLight ${yellowFlashing ? 'defaultModeOn' : ''} ${activeColor === 'yellow' ? 'yellow' : ''}`}></div>
      <div className={`greenLight ${activeColor === 'green' ? 'green' : ''}`}></div>
    </div>
  );
}

export default App;
