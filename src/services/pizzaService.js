export const getAllCheeses = () => {
    return fetch("http://localhost:8088/cheeses").then((res)=>res.json())
}

export const getAllSizes = () => {
    return fetch("http://localhost:8088/sizes").then((res)=>res.json())
}

export const getAllSauces = () => {
    return fetch("http://localhost:8088/sauces").then((res)=>res.json())
}

export const getAllToppings = () => {
    return fetch("http://localhost:8088/toppings")
}

export const postToppingsOrder = (toppingChoice) => {
    const postOptions = {
            method:"POST",
            headers:{
            "content": "application/json"
            },
            body: JSON.stringify(toppingChoice)
    }
    return fetch("http://localhost:8088/pizzaToppings", postOptions)
}