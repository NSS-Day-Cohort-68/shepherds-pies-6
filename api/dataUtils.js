// returns a random number from low to high
const getRandom = (low, high, dec = 0) => {
	return parseFloat((low + Math.random() * (high - low)).toFixed(dec))
}

// returns an array of toppings for the database
const generateToppings = (pizzaAmount, maxToppingAmount, minToppingAmount = 1, startId = 1) => {
	let out = []

	for (let i = 0; i < pizzaAmount; i++) {
		for (let j = 0; j < getRandom(minToppingAmount, maxToppingAmount); j++) {
			out.push({
				id: out.length + 1,
				pizzaId: startId + i,
				toppingId: getRandom(1, 8),
			})
		}
	}

	return out
}

// console.log(generateToppings(7, 5))
