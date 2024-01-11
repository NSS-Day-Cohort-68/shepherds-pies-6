import { useEffect, useState } from "react"
import { getAllCheeses, getAllSauces, getAllSizes } from "../../Services/pizzaService"
import "./CreatePizza.css"

export const CreatePizza = () => {
    const [sizeArray, setSizeArray] = useState([])
    const [sizeChoice, setSizeChoice] = useState('')
    const [cheesesArray,setCheesesArray] = useState([])
    const [cheeseChoice, setCheeseChoice] = useState('')
    const [sauceArray, setSauceArray] = useState([])
    const [sauceChoice, setSauceChoice] = useState('')

    useEffect(()=>{
        getAllSizes().then((response)=>{
            setSizeArray(response)
        })
    }, [])

    useEffect(()=>{
        getAllCheeses().then((response)=>{
            setCheesesArray(response)
        })
    }, [])

    useEffect(()=>{
        getAllSauces().then((response)=>{
            setSauceArray(response)
        })
    }, [])

    return (
        <div className="createPizza-main-container">
                        <div className="createPizza-choices-block">
                <h2 className="createPizza-header">Size</h2>
                <ul className="createPizza-choices-list">
                    {sizeArray.map((size) => {
                        return (
                        <li className="createPizza-choices-item" key={size.id}>
                            <label>
                                <input
                                onChange={(event)=>{setSizeChoice(event.target.value)}}
                                type="radio"
                                name="sizes"
                                value={size.id}
                                />
                            {size.size}
                            </label>
                        </li>
                        )
                    })}
                </ul>
                    

            </div>

            <div className="createPizza-choices-block">
                <h2 className="createPizza-choices-header">Cheese</h2>
                <ul className="createPizza-choices-list">
                    {cheesesArray.map((cheese) => {
                        return ( 
                        <li className="createPizza-choices-item" key={cheese.id}>
                            <label>
                                <input 
                                    onChange={(event)=>{setCheeseChoice(event.target.value)}}
                                    type="radio" 
                                    name="cheeses" 
                                    value={cheese.id}
                                    />
                                {cheese.cheese}
                            </label>
                        </li>
                        )
                    })}
                </ul>
            </div>
            
            <div className="createPizza-choices-block">
                <h2 className="createPizza-header">Sauce</h2>
                <ul className="createPizza-choices-list">
                    {sauceArray.map((sauce) => {
                        return (
                            <li className="createPizza-choices-item" key={sauce.id}>
                                <label>
                                    <input
                                    onChange={(event)=>{setSauceChoice(event.target.value)}}
                                    type="radio"
                                    name="sauces"
                                    value={sauce.id}
                                    />
                                {sauce.sauce}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="createPizza-choices-block">
                <h2 className="createPizza-header">Sauce</h2>
                <ul className="createPizza-choices-list">
                    
                </ul>
            </div>
        </div> 
    )
}
