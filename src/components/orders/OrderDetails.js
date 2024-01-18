import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  getAllToppings,
  getPizzaToppings,
  getPizzasByOrderId,
} from "../../services/pizzaService"

export const OrderDetails = () => {
  const { orderId } = useParams()
  const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])
  const [allToppings, setAllToppings] = useState([])
  const [pizzaToppings, setPizzaToppings] = useState([])

  const getToppingsForPizza = (pizza) => {
    //check if pizza object is defined - if not return empty array
    if (!pizza || !allToppings || !pizzaToppings) {
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
    getPizzasByOrderId(orderId).then((currentPizzas) => {
      setCurrentOrdersPizzas(currentPizzas)
    })
  }, [orderId])

  useEffect(() => {
    getAllToppings().then((toppingsArr) => {
      setAllToppings(toppingsArr)
    })
    getPizzaToppings().then((pizzaToppingsArr) =>
      setPizzaToppings(pizzaToppingsArr)
    )
  }, [])

  return (
    <div className="order-details">
      <h2>Order #{orderId} Details</h2>
      <div className="pizzas-in-order-container">
        {currentOrdersPizzas.map((ordersPizzaObj) => {
          const toppingString = getToppingsForPizza(ordersPizzaObj)
            .map((topping) => topping.topping)
            .join(", ")
          return (
            <div className="pizzas-in-order" key={ordersPizzaObj.id}>
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
      <button className="edit-order-btn">
        <Link to={`/editOrder/${orderId}`}>Edit Order</Link>
      </button>
    </div>
  )
}
