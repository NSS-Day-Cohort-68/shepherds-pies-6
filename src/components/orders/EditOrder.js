import { useEffect, useState } from "react"
import {
  deletePizza,
  deleteToppingsForPizza,
  getAllToppings,
  getPizzaToppings,
  getPizzasByOrderId,
} from "../../services/pizzaService"
<<<<<<< HEAD
import { getOrderById } from "../../services/orderService"
=======
import { editOrder, getOrderById } from "../../services/orderService"
>>>>>>> 198cd5bf3c4f0826ef9d8d17866d908b669ee74c
import { Link, useParams } from "react-router-dom"
import { getAllEmployees } from "../../services/employeeService"

export const EditOrder = () => {
  const { orderId } = useParams()
  const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])
  const [currentOrder, setCurrentOrder] = useState([])
  const [allToppings, setAllToppings] = useState([])
  const [pizzaToppings, setPizzaToppings] = useState([])
  const [driverSelection, setDriverSelection] = useState(null)
  const [tableNumberSelection, setTableNumberSelection] = useState(0)
  const [allEmployees, setAllEmployees] = useState([])
  const tableNumbers = []

  const handleEditOrder = (event) => {
    const orderObj = {
      id: orderId,
      employeeId: currentOrder.employeeId,
      deliveryDriver: driverSelection,
      tableNumber: tableNumberSelection,
      timestamp: currentOrder.timestamp,
    }

    editOrder(orderObj)
  }
  for (let i = 1; i <= 20; i++) {
    tableNumbers.push(i)
  }

  const handleEmployeeChange = (event) => {
    setDriverSelection(event.target.value)
  }

  const handleTableChange = (event) => {
    setTableNumberSelection(event.target.value)
  }

  const getAndSetPizzas = (orderId) => {
    getPizzasByOrderId(orderId).then((currentPizzas) => {
      setCurrentOrdersPizzas(currentPizzas)
    })
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
    getAndSetPizzas(orderId)
    getOrderById(orderId).then((order) => {
      setCurrentOrder(order)
    })
  }, [orderId])

  return (
    <div className="create-order-container">
      {currentOrder.deliveryDriver !== null && (
        <div className="dropdown-container">
          <div>Current: Driver {currentOrder.deliveryDriver}</div>
          <label>Change driver: </label>
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
                  {employeeObj.id}. {employeeObj.name}
                </option>
              )
            })}
          </select>
          <button className="save-driver-btn" onClick={handleEditOrder}>
            Save Driver
          </button>
        </div>
      )}
      {currentOrder.deliveryDriver === null && (
        <div className="dropdown-container">
          <div>Current: Table #{currentOrder.tableNumber}</div>
          <label>Change Table: </label>
          <select
            id="table-dropdown"
            className="dropdown"
            onChange={handleTableChange}
          >
            <option className="table-name" value="0">
              Table #
            </option>
            {tableNumbers.map((tableNum) => {
              return (
                <option className="table" value={tableNum}>
                  {tableNum}
                </option>
              )
            })}
          </select>
          <button className="save-table-btn" onClick={handleEditOrder}>
            Save Table
          </button>
        </div>
      )}

      <div className="pizzas-in-order-container">
        {currentOrdersPizzas.map((ordersPizzaObj) => {
          const toppingString = getToppingsForPizza(ordersPizzaObj)
            .map((topping) => topping.topping)
            .join(", ")
          return (
            <div className="pizzas-details">
              <div>
                <i
                  className="delete-btn fa-solid fa-trash"
                  onClick={async () => {
                    await deletePizza(ordersPizzaObj)
                    await deleteToppingsForPizza(ordersPizzaObj)
                    getAndSetPizzas(orderId)
                  }}
                ></i>
              </div>
              <div className="pizzas-in-order">
                <div>
                  A {ordersPizzaObj.size.size} pizza with{" "}
                  {ordersPizzaObj.cheese.cheese} cheese, and{" "}
                  {ordersPizzaObj.sauce.sauce} sauce
                </div>
                <div> Toppings: {toppingString} </div>
              </div>
              <div className="pizza-price">$00.00</div>
            </div>
          )
        })}
        <button className="add-new-pizza-btn">
          <Link to="/createPizza">New Pizza</Link>
        </button>
      </div>
      <div className="order-footer-container">
        <div className="order-total">Total:</div>
        <div className="order-total">${}</div>
      </div>
      <div className="order-footer-container">
        <button className="all-orders-btn">
          <Link to="/allOrders">All Orders</Link>
        </button>
      </div>
    </div>
  )
}
