import { useEffect, useState } from 'react';
import Currency from './component/CurrencyComponent';
import money from './img/money.png'

function App() {

  const [fromCurrency,setFromCurrency]=useState("THB")
  const [toCurrency,setToCurrency]=useState("USD")

  const [amount,setAmount]=useState(1)
  const [exchangeRate,setExchangeRate]=useState(0)

  const [checkFromCurrency,setCheckFromCurrncy]=useState(true)
  let fromAmount,toAmount

  if(checkFromCurrency){
    fromAmount = amount
    toAmount = (amount*exchangeRate).toFixed(2)
  }else{
    toAmount = amount
    fromAmount = (amount/exchangeRate).toFixed(2)
  }

  const [currencyChoice,setCurrencyChoice]=useState([]);

  useEffect(()=>{
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCurrencyChoice([...Object.keys(data.rates)])
      setExchangeRate(data.rates[toCurrency])
    })
  },[fromCurrency,toCurrency])

  const amountFromCurrency=(e)=>{
    setAmount(e.target.value)
    setCheckFromCurrncy(true)
  }
  const amountToCurrency=(e)=>{
    setAmount(e.target.value)
    setCheckFromCurrncy(false)
  }

  return (
    <div>
      <img src={money} alt='LOGO' className='money'/>
      <h1>แอพแปลงสกุลเงิน</h1>
      <div className='container'>
        <Currency 
          currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency}
          changeCurrency={(e)=>setFromCurrency(e.target.value)}
          amount={fromAmount}
          onchangeamount={amountFromCurrency}
        />
        <h1 className='equal'>=</h1>
        <Currency 
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency}
          changeCurrency={(e)=>setToCurrency(e.target.value)}
          amount={toAmount}
          onchangeamount={amountToCurrency}
        />
      </div>
    </div>
  );
}

export default App;
