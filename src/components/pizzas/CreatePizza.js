import { useEffect, useState } from "react"
import { getAllCheeses, getAllSauces, getAllSizes, getAllToppings, getCurrentPizzaToppings, postTopping, deleteTopping, postPizza, getPizzaById, editPizza } from "../../services/pizzaService"
import { useNavigate } from "react-router-dom"
import "./CreatePizza.css"

export const CreatePizza = ({ currentOrderID }) => {
    const navigate = useNavigate()

    const [sizeArray, setSizeArray] = useState([])
    const [sizeChoice, setSizeChoice] = useState(undefined)
    const [cheesesArray,setCheesesArray] = useState([])
    const [cheeseChoice, setCheeseChoice] = useState(undefined)
    const [sauceArray, setSauceArray] = useState([])
    const [sauceChoice, setSauceChoice] = useState(undefined)
    const [toppingsArray, setToppingsArray] = useState([])
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState([])
    const [workingPizza, setWorkingPizza] = useState({})
    const [btnState, setBtnState] = useState(false)
    const [checkBoxState, setCheckBoxState] = useState(true)
    const [pizzaId, setPizzaId] = useState('')


    // ------PIZZA FUNCTIONS------

    const renderBasePizzaDetails = () => {
        getPizzaById(pizzaId).then((res)=>{
            if (res !== undefined) {
                setWorkingPizza(res)             
            } 
        })
    }   
    
    const renderCurrentPizzaToppings = async () => {
        await getCurrentPizzaToppings(workingPizza.id).then((response)=>{
            setCurrentPizzaToppings(response)
        })
    }

    const addPizza = () => {
        if (pizzaId === undefined) {
            const newPizzaObj = {
                    "sizeId": sizeChoice,
                    "cheeseId": cheeseChoice,
                    "sauceId": sauceChoice,
                    "orderId": currentOrderID
            }
            postPizza(newPizzaObj).then((res)=>{
                setWorkingPizza(res)
            })
        } else {
            const editPizzaObj = {
                "sizeId": sizeChoice,
                "cheeseId": cheeseChoice,
                "sauceId": sauceChoice,
                "orderId": currentOrderID,
                "id": pizzaId
            }
            editPizza(editPizzaObj)
        }
    }


    //-----CHOICES UTILITIES-----

    const disableRadioChoices = () => {
        setBtnState(true)
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


    // -----BUTTON UTILITIES------

    const savePizzaAlert = () => {
        if (checkBoxState){
           return window.alert("Please save pizza base before adding toppings ")
        }
    }

    const checkPizzaBeforeSave = () => {
        if (sizeChoice === undefined || cheeseChoice === undefined || sauceChoice === undefined) {
            window.alert('Please select one of each pizza base choices')
        } else {
            addPizza()
            disableRadioChoices()
            enableCheckBoxes()
        }
    }

    const checkPizzaBeforeAdd = () => {
        if (sizeChoice === undefined || cheeseChoice === undefined || sauceChoice === undefined) {
            window.alert('Please select pizza base choices and save before adding to order')
        } else {
            navigate("/EditOrder")
        }
    }


    // -----USEEFFECT TRIGGERS-----

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

        useEffect(()=>{
            renderBasePizzaDetails()
        }, [pizzaId])

        useEffect(()=>{
            setSizeChoice(workingPizza.sizeId)
            setCheeseChoice(workingPizza.cheeseId)
            setSauceChoice(workingPizza.sauceId)
            renderCurrentPizzaToppings()
        }, [workingPizza])

        useEffect(()=>{
            currentPizzaToppings.length !== 0 && enableCheckBoxes()
        },[currentPizzaToppings])

    return (
        <>
            <div className="createPizza-main-container">
                <div className="createPizza-block-container">
                    <div className="createPizza-choices-block">
                        <h2 className="createPizza-header">Size</h2>
                        <ul className="createPizza-choices-list" >
                            {sizeArray.map((size) => {
                                return (
                                <li className="createPizza-choices-item" key={size.id}>
                                    <label>
                                        <input
                                        onChange={(event)=>{setSizeChoice(event.target.value)}}
                                        id={`size${size.id}`}
                                        type="radio"
                                        name="sizes"
                                        value={size.id}
                                        disabled={btnState}
                                        checked = {size.id === parseInt(sizeChoice)}
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
                                            checked={cheese.id === parseInt(cheeseChoice)}
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
                                            checked={sauce.id === parseInt(sauceChoice)}
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
                            onClick={checkPizzaBeforeSave}
                        >Save Pizza To Order
                    </button>
                </div> 
            </div>
            <div className="createPizza-toppings-container">
                <div className="createPizza-choices-block">
                    <h2 className="createPizza-header">Add Toppings</h2>
                    <ul className="createPizza-choices-list">
                        {toppingsArray.map((topping) => {
                            return (
                                <li className="choices-list-item" key={topping.id} >
                                    <label onClick={savePizzaAlert}>
                                        <input
                                        onClick={(e)=>handleChangeCheckBox(e, topping.id)}
                                        type="checkbox"
                                        name={topping.topping}
                                        disabled={checkBoxState}
                                        checked={currentPizzaToppings.some(x => {
                                            return x.toppingId === topping.id
                                        })}
                                        />
                                    {topping.topping}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                <button className="createPizza-btn" 
                        onClick={checkPizzaBeforeAdd}
                        >Done
                </button>
                </div> 
            </div>            
        </>
    )
}
