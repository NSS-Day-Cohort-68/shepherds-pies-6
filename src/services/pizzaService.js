export const getAllPizzas = async () => {
  return await fetch(`http://localhost:8088/pizzas?_expand=sauce`).then((res) =>
    res.json()
  )
}

export const getAllPizzaDetails = async () => {
  return await fetch(
    `http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce&embed=pizzaToppings`
  ).then((res) => res.json())
}

export const getOrdersPizzas = async (orderID) => {
  return await fetch(
    `http://localhost:8088/pizzas?orderId=${orderID}&_expand=size&_expand=cheese&_expand=sauce&_embed=pizzaToppings`
  ).then((res) => res.json())
}

export const addNewPizza = (pizza, order) => {
  return fetch(`http://localhost:8088/pizzas/${order.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  })
}

export const getAllToppings = async () => {
  return await fetch(
    `http://localhost:8088/toppings`
  ).then((res) => res.json())
}

export const getPizzaToppings = async (pizza) => {
  return await fetch(
    `http://localhost:8088/pizzaToppings?_expand=topping`
  ).then((res) => res.json())
}
