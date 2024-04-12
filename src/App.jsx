import { useState } from 'react';
import { PropTypes } from 'prop-types'
import './App.css'

function NumberInput({title, emptyValue, value, setValue}) {
  
  function handleInput(value) {
    value = parseFloat(value);
    if (!value) {
      setValue(emptyValue);
    } else if (value >= 0) {
      setValue(value)
    }
  }

  return (
    <div className="input-container">
      <h2 className='input-label'>{title}</h2>
      <div className="number-input">
        <input type="number"
        value={value === emptyValue ? '' : value}
        placeholder={emptyValue}
        onChange={(e) => handleInput(e.target.value)} />
      </div>
    </div>
  );
}
NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
  emptyValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired
}

function SelectTip(props) {

  function CustomTip() {
    return (
      <div className="tip-option custom-tip">
        <input type="number" placeholder="Custom" />
      </div>
    )
  }

  return (
    <div className='select-tip'>
      {props.values.map(value => (
        <div key={value} className="tip-option">
          <input 
          type="radio"
          name="tip"
          id={value}
          value={value}
          checked={value === props.selected}
          onChange={e => {props.setValue(e.target.value)}} />
          <label htmlFor={value}>{value}%</label>
        </div>
        )
      )}
      <CustomTip />
    </div>
)}

function Results(props) {
  function Result(props) {
    return (
      <div className="result">
        <div className="result-start">
          <h4>{props.title}</h4>
          <p>/ person</p>
        </div>
        <div className="result-value">${props.value == 0 ? '0.00' : props.value}</div>
      </div>
    );
  }
 
  return (
    <div className="results-container">
      <div className="result-start">
        <Result title='Tip Amount' value={props.tipAmount} />
        <Result title='total' value={props.total} />
      </div>
      <button className='reset-btn' onClick={props.reset}>Reset</button>
    </div>
  )
}
Results.propTypes = {
  tipAmount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
}

function App() {
  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(15)
  const [nPeople, setNPeople] = useState(1)

  let tipAmount = (bill * (tip/100)) / nPeople;
  let total = (bill / nPeople) + tipAmount

  function reset() {
    setBill(0)
    setTip(15)
    setNPeople(1)
  }

  return (
    <div className='card-container'>
      <div className="inputs-container">
        <NumberInput title='Bill' emptyValue={0} value={bill} setValue={setBill} />
        <div className="input-container">
          <h2 className="input-label">Select Tip%</h2>
          <SelectTip values={[5, 10, 15, 25, 50]} selected={parseInt(tip)} setValue={setTip} />
        </div>
        <NumberInput title='Number of People' emptyValue={1} value={nPeople} setValue={setNPeople} />
      </div>
      <Results tipAmount={parseFloat(tipAmount.toFixed(2))} total={parseFloat(total.toFixed(2))} reset={reset} />
    </div>
  )
}

export default App
