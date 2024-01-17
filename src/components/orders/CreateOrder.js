import { useEffect, useState } from "react"
import {
  getAllToppings,
  getPizzasByOrderId,
  getPizzaToppings,
} from "../../services/pizzaService"
import { addNewOrder, getAllOrders } from "../../services/orderService"
import { Link } from "react-router-dom"
import { getAllEmployees } from "../../services/employeeService"

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
  const [deliveryType, setDeliveryType] = useState("")
  const [driverSelection, setDriverSelection] = useState(null)
  const [tableNumberSelection, setTableNumberSelection] = useState(0)
  const [allEmployees, setAllEmployees] = useState([])
  const tableNumbers = []

  for (let i = 1; i <= 20; i++) {
    tableNumbers.push(i)
  }

  const handleAddNewOrder = (event) => {
    const newOrderObj = {
      id: allOrders.length + 1,
      employeeId: currentUser.id,
      deliveryDriver: driverSelection,
      tableNumber: tableNumberSelection,
      timestamp: new Date(),
    }

    addNewOrder(newOrderObj)
    setCurrentOrderID(newOrderObj.id)
    setIsNewOrderCreated(true)
  }

  const handleDeliveryTypeChange = (event) => {
    setDeliveryType(event.target.value)
    //resets if the delivery type is changed
    setTableNumberSelection(0)
    setDriverSelection(null)
  }

  const handleEmployeeChange = (event) => {
    setDriverSelection(event.target.value)
  }

  const handleTableChange = (event) => {
    setTableNumberSelection(event.target.value)
  }

  const getToppingsForPizza = (pizza) => {
    //check if pizza object is defined - if not return empty array
    if (!pizza) {
      return []
    }
    //gets all the pizzaToppings with the pizzaId
    //then map each pizzaTopping to get the toppingId
    //then for each toppingId we want to compare toppingId to
    //the topping id and return the topping for that pizza
    const toppingsForPizza = pizzaToppings
      .filter((pizzaTopping) => pizzaTopping.pizzaId === pizza.id)
      .map((pizzaTopping) => pizzaTopping.toppingId)
      .map((toppingId) =>
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
    getAllEmployees().then((employeesArr) => {
      setAllEmployees(employeesArr)
    })
  }, [])

  useEffect(() => {
    //only fetch pizzas after a new order is created
    if (isNewOrderCreated) {
      getPizzasByOrderId(currentOrderID).then((currentPizzas) => {
        setCurrentOrdersPizzas(currentPizzas)
      })
    }
  }, [currentOrderID, isNewOrderCreated])

  return (
    <div className="create-order-container">
      <div className="delivery-radio-container">
        <h4>Select order type:</h4>
        <label className="delivery-radio">
          <input
            type="radio"
            value="table"
            checked={deliveryType === "table"}
            onChange={handleDeliveryTypeChange}
          />
          Dine-In
        </label>
        <label className="delivery-radio">
          <input
            type="radio"
            value="delivery"
            checked={deliveryType === "delivery"}
            onChange={handleDeliveryTypeChange}
          />
          Delivery
        </label>
      </div>

      {deliveryType === "delivery" && (
        <div className="dropdown-container">
          <label>Select a driver: </label>
          <select
            id="employeees-dropdown"
            className="dropdown"
            onChange={handleEmployeeChange}
          >
            <option className="employee-name" value="0">
              Delivery Driver
            </option>
            {allEmployees.map((employeeObj) => {
              return (
                <option className="employee" value={employeeObj.id}>
                  {employeeObj.name}
                </option>
              )
            })}
          </select>
        </div>
      )}
      {deliveryType === "table" && (
        <div className="dropdown-container">
          <label>Select a Table #: </label>
          <select
            id="table-dropdown"
            className="dropdown"
            onChange={handleTableChange}
          >
            <option className="table-name" value="0">
              Table
            </option>
            {tableNumbers.map((tableNum) => {
              return (
                <option className="table" value={tableNum}>
                  {tableNum}
                </option>
              )
            })}
          </select>
        </div>
      )}

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
        <button className="add-new-pizza-btn" disabled={!isNewOrderCreated}>
          {isNewOrderCreated ? (
            <Link to="/createPizza" disabled={!isNewOrderCreated}>
              New Pizza
            </Link>
          ) : (
            <span>New Pizza</span>
          )}
        </button>
      </div>
      <div className="order-footer-container">
        <div className="order-total">Total:</div>
        <div className="order-total">$00.00</div>
      </div>
      <div className="order-footer-container">
        <button className="all-orders-btn" disabled={!isNewOrderCreated}>
          {isNewOrderCreated ? (
            <Link to="/allOrders">All Orders</Link>
          ) : (
            <span>All Orders</span>
          )}
        </button>
      </div>
    </div>
  )
}
