import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([
    "CAD", "AUD", "HKD", "USD", "GBP",
    ]);
  const [rates, setRates] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');

  function doFetch() {
      const url = "https://api.exchangeratesapi.io/latest?base=" + baseCurrency;
      fetch(url)
          .then(response => response.json())
          .then(data => {
              console.log('data rates:', data.rates);
              setRates(Object.entries(data.rates));
      });
  }

  function onSelect(event) {
    setBaseCurrency(event.target.value)
  }

  useEffect(doFetch, [baseCurrency]);

  return (
    <div className="NavBar">
      <h1>Currency Rates</h1>
      <label>Choose a currency:
        <select onChange={onSelect} value={baseCurrency}>
          {
            rates.map(rate => (
              <option value={rate[0]}>{rate[0]}</option>
            ))
          }
        </select> 
      </label>

    <div className="BarChart">
    {
      rates
      .filter(rate => currencies.includes(rate[0])) 
      .map(rate => (
        <div 
        className="BarChart-bar" 
        style={{height: (1/rate[1] * 80) + "%"}}>
         {rate[0]}<br></br>
         {rate[1]}
        </div>
      ))
    }
    </div>
  </div>
  );
}

export default App;