export const getUserByEmail = async (email) => {
	return await fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
		res.json()
	)
}

export const createUser = (newUser) => {
	return fetch(`http://localhost:8088/employees`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	})
}
