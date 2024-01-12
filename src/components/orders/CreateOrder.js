import { useEffect, useState } from "react"
import {
  addNewPizza,
  getOrdersPizzas,
  getAllPizzaDetails,
} from "../../services/pizzaService"
import { addNewOrder, getAllOrders } from "../../services/orderService"
import { Link } from "react-router-dom"

//Order page - add pizzas and edit table number or delivery driver
export const ShowOrder = ({ currentUser, setCurrentOrderID }) => {
  const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [allPizzas, setAllPizzas] = useState([])

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
  }

  useEffect(() => {
    getAllOrders().then((ordersArr) => {
      setAllOrders(ordersArr)
    })
    getAllPizzaDetails().then((pizzasArr) => {
      setAllPizzas(pizzasArr)
    })
  }, [])

  return (
    <div>
      <div>
        {/* {currentOrdersPizzas.map((ordersPizza) => {
          return <div>A {ordersPizza.sizeId.size} with {ordersPizza.cheeseId.cheese}, {ordersPizza.sauceId.sauce} sauce, and { } toppings</div>
        })} */}
      </div>
      <button className="create-order-btn" onClick={handleAddNewOrder}>
        New Order
      </button>
      <button className="add-new-pizza-btn">
        <Link to="/createPizza">New Pizza</Link>
      </button>
    </div>
  )
}

// get the current order ID
// when click on add pizza, current order id is pizza orderId
// navigate to Add Pizza page
// when assign driver is selected, deliveryDriver is employee Id
