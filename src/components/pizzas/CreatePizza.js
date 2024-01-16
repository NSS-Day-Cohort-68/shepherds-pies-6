import { useEffect, useState } from "react"
import { getAllCheeses, getAllSauces, getAllSizes, getAllToppings, getCurrentPizzaToppings, postTopping, deleteTopping, postPizza } from "../../services/pizzaService"
import "./CreatePizza.css"

export const CreatePizza = () => {
    const orderId = 3                              //delete this var and bring in orderId as prop

    const [sizeArray, setSizeArray] = useState([])
    const [sizeChoice, setSizeChoice] = useState('')
    const [cheesesArray,setCheesesArray] = useState([])
    const [cheeseChoice, setCheeseChoice] = useState('')
    const [sauceArray, setSauceArray] = useState([])
    const [sauceChoice, setSauceChoice] = useState('')
    const [toppingsArray, setToppingsArray] = useState([])
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState([])
    const [workingPizza, setWorkingPizza] = useState([])
    const [btnState, setBtnState] = useState(false)
    const [checkBoxState, setCheckBoxState] = useState(true)

    const renderCurrentPizzaToppings = async () => {
        await getCurrentPizzaToppings(workingPizza.id).then((response)=>{
            setCurrentPizzaToppings(response)
        })
    }

    const addPizza = () => {
        const pizzaObj = {
                "sizeId": sizeChoice,
                "cheeseId": cheeseChoice,
                "sauceId": sauceChoice,
                "orderId": orderId
		}
        postPizza(pizzaObj).then((res)=>{
            setWorkingPizza(res)
        })
    }

    const disableRadioChoices = () => {
        setBtnState(true)
    }

    const enableRadioChoices = () => {
        setBtnState(false)
    }

    const enableCheckBoxes = () => {
        setCheckBoxState(false)
    }

    const handleChangeCheckBox = (e, id) => {
        let check = e.target.checked
        let pizzaToppingObj = {
                toppingId: id,
                pizzaId: workingPizza.id
        }

        if (check) {
            postTopping(pizzaToppingObj).then(()=>renderCurrentPizzaToppings())
        } else {
            const foundTopping = currentPizzaToppings.find((topping)=> topping.toppingId === id)
            deleteTopping(foundTopping).then(()=>renderCurrentPizzaToppings())
        }
        
    }

    


    useEffect(()=>{
        getAllSizes().then((response)=>{
            setSizeArray(response)
        })

        getAllCheeses().then((response)=>{
            setCheesesArray(response)
        })

        getAllSauces().then((response)=>{
            setSauceArray(response)
        })

        getAllToppings().then((response)=>{
            setToppingsArray(response)
        })

    }, [])


    return (
        <>
            <div className="createPizza-main-container">
                <div className="createPizza-block-container">
                    <div className="createPizza-choices-block">
                        <h2 className="createPizza-header">Size</h2>
                        <ul className="createPizza-choices-list">
                            {sizeArray.map((size) => {
                                return (
                                <li className="createPizza-choices-item" key={size.id}>
                                    <label>
                                        <input
                                        onClick={(event)=>{setSizeChoice(event.target.value)}}
                                        type="radio"
                                        name="sizes"
                                        value={size.id}
                                        disabled={btnState}
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
                                            disabled={btnState}
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
                                            disabled={btnState}
                                            />
                                        {sauce.sauce}
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="createPizza-btns-container">
                    <button className="createPizza-btn" 
                        onClick={()=>{
                            addPizza()
                            disableRadioChoices()
                            enableCheckBoxes()
                        }}>Save Pizza To Order
                    </button>
                    <button className="createPizza-btn" 
                        onClick={()=>{
                            enableRadioChoices()
                        }}>Edit Pizza
                    </button>
                </div> 
            </div>
            <div className="createPizza-toppings-container">
                <div className="createPizza-choices-block">
                    <h2 className="createPizza-header">Add Toppings</h2>
                    <ul className="createPizza-choices-list">
                        {toppingsArray.map((topping) => {
                            return (
                                <li className="choices-list-item" key={topping.id}>
                                    <label>
                                        <input
                                        onClick={(e)=>handleChangeCheckBox(e, topping.id)}
                                        type="checkbox"
                                        name={topping.topping}
                                        disabled={checkBoxState}
                                        />
                                    {topping.topping}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                <button className="createPizza-btn" onClick={()=>{}}>Submit Pizza</button>
                </div> 
            </div>            
        </>
    )
}
