export const getAllPizzas = async () => {
  return await fetch(`http://localhost:8088/pizzas?_expand=sauce`).then((res) =>
    res.json()
  )
}

export const getAllPizzaDetails = async () => {
  return await fetch(
    `http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce`
  ).then((res) => res.json())
}

export const getOrdersPizzas = async (orderID) => {
  return await fetch(`http://localhost:8088/pizzas/${orderID}`).then((res) =>
    res.json()
  )
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
