
export const getPizza = async () => {
    return await fetch (`http://localhost:8088/pizzas`).then((res) => res.json())
}

export const addNewPizza = async (pizza) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pizza),
  }
  return await fetch(`http://localhost:8088/pizzas`, postOptions)
}
