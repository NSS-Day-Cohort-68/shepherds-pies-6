import { useEffect, useState } from "react"
import {
  getAllToppings,
  getOrdersPizzas,
  getPizzaToppings,
} from "../../services/pizzaService"
import { addNewOrder, getAllOrders } from "../../services/orderService"
import { Link } from "react-router-dom"

//Order page - add pizzas and edit table number or delivery driver
export const ShowOrder = ({
  currentUser,
  setCurrentOrderID,
  currentOrderID,
}) => {
  const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [allToppings, setAllToppings] = useState([])
  const [pizzaToppings, setPizzaToppings] = useState([])
  const [isNewOrderCreated, setIsNewOrderCreated] = useState(false)

  const handleAddNewOrder = (event) => {
    event.preventDefault()
    const newOrderObj = {
      id: allOrders.length + 1,
      employeeId: currentUser.id,
      deliveryDriver: null,
      tableNumber: 0,
      timestamp: new Date(),
    }

    addNewOrder(newOrderObj)
    setCurrentOrderID(newOrderObj.id)
    setIsNewOrderCreated(true)
  }

  const getToppingsForPizza = (pizza) => {
    //gets all the pizzaToppings with the pizzaId
    const pizzaToppingsForPizza = pizzaToppings.filter(
      (pizzaTopping) => pizzaTopping.pizzaId === pizza.id
    )
    //then map each pizzaTopping to get the toppingId
    const toppingIds = pizzaToppingsForPizza.map(
      (pizzaTopping) => pizzaTopping.toppingId
    )
    //then for each toppingId we want to compare it to the topping id and return the topping for that pizza
    const toppingsForPizza = toppingIds.map((toppingId) =>
      allToppings.find((topping) => topping.id === toppingId)
    )
    return toppingsForPizza
  }

  useEffect(() => {
    getAllOrders().then((ordersArr) => {
      setAllOrders(ordersArr)
    })
    getAllToppings().then((toppingsArr) => {
      setAllToppings(toppingsArr)
    })
    getPizzaToppings().then((pizzaToppingsArr) =>
      setPizzaToppings(pizzaToppingsArr)
    )
  }, [])

  useEffect(() => {
    //only fetch pizzas after a new order is created
    if (isNewOrderCreated) {
      getOrdersPizzas(currentOrderID).then((currentPizzas) => {
        setCurrentOrdersPizzas(currentPizzas)
      })
    }
  }, [currentOrderID, isNewOrderCreated])

  return (
    <div className="create-order-container">
      <button className="create-order-btn" onClick={handleAddNewOrder}>
        New Order
      </button>
      <div className="pizzas-in-order-container">
        {currentOrdersPizzas.map((ordersPizzaObj) => {
          const toppingString = getToppingsForPizza(ordersPizzaObj)
            .map((topping) => topping.topping)
            .join(", ")
          return (
            <div className="pizzas-in-order">
              <div>
                A {ordersPizzaObj.size.size} pizza with{" "}
                {ordersPizzaObj.cheese.cheese} cheese, and{" "}
                {ordersPizzaObj.sauce.sauce} sauce
              </div>
              <div> Toppings: {toppingString} </div>
            </div>
          )
        })}
      </div>
      <button className="add-new-pizza-btn" disabled={!isNewOrderCreated}>
        <Link to="/createPizza">New Pizza</Link>
      </button>
    </div>
  )
}

// get the current order ID
// when click on add pizza, current order id is pizza orderId
// navigate to Add Pizza page
// when assign driver is selected, deliveryDriver is employee Id
