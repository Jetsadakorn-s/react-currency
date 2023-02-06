import './CurrencyComponent.css'

const Currency=(props)=>{
    const { currencyChoice,selectCurrency,changeCurrency,amount,onchangeamount }=props
    return(
        <div className="currency">
            <select value={selectCurrency} onChange={changeCurrency}>
                {currencyChoice.map((choice)=>
                <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="number" value={amount} onChange={onchangeamount}/> 
        </div>
    )

}
export default Currency;