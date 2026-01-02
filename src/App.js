import './App.css';
import React, { useEffect, useState } from "react";


function App() {
    const [currentMode, setCurrentMode] = useState('initial');
    const [yellowFlashing, setYellowFlashing] = useState(false);
    const [activeColor, setActiveColor] = useState('');
    const [lightOnDuration, setLightOnDuration] = useState({
        red: 10000,
        yellow: 2000,
        green: 10000,
    });
    const [inputDurations, setInputDurations] = useState({
        red: lightOnDuration.red / 1000,
        yellow: lightOnDuration.yellow / 1000,
        green: lightOnDuration.green / 1000,
    });

    const screenHeight = window.innerHeight / 3.145;

    const handleSaveDurations = () => {
      setLightOnDuration({
        red: Number(inputDurations.red) * 1000,
        yellow: Number(inputDurations.yellow) * 1000,
        green: Number(inputDurations.green) * 1000,
      })
    };

    useEffect(() => {
        if (currentMode !== 'initial') return;

        const interval = setInterval(() => {
            setYellowFlashing(prev => !prev);
        }, 800);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            setYellowFlashing(false);
            setCurrentMode('working');
            setActiveColor('red');
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [currentMode]);

    useEffect(() => {
        if (currentMode !== 'working') return;

        let timeout;

        if (activeColor === 'red') {
            timeout = setTimeout(() => setActiveColor('green'), lightOnDuration.red);
        } else if (activeColor === 'green') {
            timeout = setTimeout(() => setActiveColor('yellow'), lightOnDuration.green);
        } else if (activeColor === 'yellow') {
            timeout = setTimeout(() => setActiveColor('red'), lightOnDuration.yellow);
        }

        return () => clearTimeout(timeout);
    }, [currentMode, activeColor, lightOnDuration]);

    useEffect(() => {
        if (currentMode !== 'hazard') return;

        setActiveColor('');
        setYellowFlashing(true);

        const interval = setInterval(() => {
            setYellowFlashing(prev => !prev);
        }, 800);

        return () => {
            clearInterval(interval);
            setYellowFlashing(false);
            setActiveColor('red')
        };
    }, [currentMode]);

    return (
        <div className='wrapper'>
            <div className="container">
                <div className={`light ${activeColor === 'red' ? 'red' : ''}`} style={{ height: screenHeight, width: screenHeight }} />
                <div className={`light ${(activeColor === 'yellow' || yellowFlashing) ? 'yellow' : ''}`} style={{ height: screenHeight, width: screenHeight }} />
                <div className={`light ${activeColor === 'green' ? 'green' : ''}`} style={{ height: screenHeight, width: screenHeight }} />
            </div>
            <div className='controls'>
                <div>
                    <p>Set color duration (seconds)</p>
                    <label>Red: </label>
                    <input type="number" value={inputDurations.red} onChange={(e) => setInputDurations(prevState => ({ ...prevState, red: Number(e.target.value) }))} />
                    <br />
                    <label>Yellow: </label>
                    <input type="number" value={inputDurations.yellow} onChange={(e) => setInputDurations(prevState => ({ ...prevState, yellow: Number(e.target.value) }))} />
                    <br />
                    <label>Green: </label>
                    <input type="number" value={inputDurations.green} onChange={(e) => setInputDurations(prevState => ({ ...prevState, green: Number(e.target.value) }))} />
                    <br />
                    <button onClick={handleSaveDurations}>Save</button>
                    <button onClick={() => {   
                        setCurrentMode(prev => prev === 'hazard' || prev === 'initial' ? 'working' : 'hazard')
                    }}>Hazard {currentMode === 'hazard' ? 'off' : 'on'}</button>
                </div>
            </div>
        </div>
    );
}

export default App;
