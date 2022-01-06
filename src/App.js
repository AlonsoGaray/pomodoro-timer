import { useState, useEffect } from 'react'
import './App.css';
import Gear from './img/gear.svg'

const App = () => {
  const [ minutes, setMinutes ] = useState(25);
  const [ seconds, setSeconds ] = useState(0);
  const [ state, setState] = useState(false);
  const [ settings, setSettings ] = useState(false);

  const startTimer = () => {
    setSettings(false)
    if (minutes > 0 || seconds > 0) {
      setState(true)
    }
    document.querySelector('.ring').style.stroke = "#09A65A"
  }

  const handleSettings = () => {  
    !settings ? setSettings(true) : setSettings(false);
  }

  const doubleDigits = (prop) => {
    const number = parseInt(prop, 10)
    if (number < 10) {
      return `0${number}`
    } else return number
  }
  
  useEffect(() => {
    if (state) {
      let interval = setInterval(() => {
        clearInterval(interval)    
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          } else {
            setSeconds(seconds)
            setMinutes(minutes)
            setState(false);
            document.querySelector('.ring').style.stroke = "#900A0A"
            alert('Tiempo fuera')
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    const inputs = document.querySelectorAll('input')
      inputs.forEach((target) => {
        if (settings) {  
          target.removeAttribute('disabled')
          target.setAttribute("placeholder", "00")
          setState(false)
        } else target.setAttribute('disabled', true)
      })
  },[minutes, seconds, settings, state])

  return (
    <div className="wrapper">

      <div className="ring">
        <svg width="518" height="518" viewBox="0 0 518 518">
          <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
        </svg>
      </div>

      <div className="timer">
        <div className="time">

          <div className="minutes">
            <input 
              type="text" 
              maxLength="2"
              value={doubleDigits(minutes)} 
              onChange={(e)=> setMinutes(e.target.value)}   
              disabled 
            />
          </div>

          <div className="colon">:</div>

          <div className="seconds">
            <input 
              type="text" 
              maxLength="2"
              value={doubleDigits(seconds)} 
              onChange={(e)=> setSeconds(e.target.value)}   
              disabled 
            />
          </div>

        </div>

        {!state ? 
          <button 
            className="start"
            onClick={() => startTimer()}
          >
            start
          </button>
          :
          <button 
            className="start"
            onClick={() => setState(false)}
          >
            stop
          </button>
        }
        
        <button 
          className="settings"
          onClick={() => handleSettings()}
        >
          <img src={Gear} alt="Settings" />
        </button>
        
      </div>
    </div>
  );
}

export default App;
