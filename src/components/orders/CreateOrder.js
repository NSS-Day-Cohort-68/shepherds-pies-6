import { useEffect, useState } from "react"
import { addNewPizza, getOrdersPizzas } from "../../services/pizzaService"

//Order page - add pizzas and edit table number or delivery driver
export const ShowOrder = ({ newOrderObj }) => {
  const [pizzaID, setPizzaID] = useState(0)
  const [currentOrdersPizzas, setCurrentOrdersPizzas] = useState([])

  let newPizzaObj = {
    sizeId: 0,
    cheeseId: 0,
    sauceId: 0,
    orderId: 0,
  }

  useEffect(() => {
    getOrdersPizzas(newOrderObj).then((ordersPizzasArr) => {
      setCurrentOrdersPizzas(ordersPizzasArr)
    })
  }, [])

	

  return (
    <div>
      <button
        className="add-new-pizza-btn"
        onClick={() => {
          //POST TO API
			addNewPizza(newPizzaObj)
			
        }}
      >
        Add Pizza
      </button>
    </div>
  )
}

// get the current order ID
// when click on add pizza, current order id is pizza orderId
// navigate to Add Pizza page
// when assign driver is selected, deliveryDriver is employee Id
