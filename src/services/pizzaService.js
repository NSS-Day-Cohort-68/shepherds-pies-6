export const getAllPizzas = async () => {
    return await fetch (`http://localhost:8088/pizzas`).then((res) => res.json())
}

export const getOrdersPizzas = async (order) => {
    return await fetch (`http://localhost:8088/pizzas/${order.id}`).then((res) => res.json())
}

export const addNewPizza = async (pizza, order) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  }
  return await fetch(`http://localhost:8088/pizzas/${order.id}`, postOptions)
}
