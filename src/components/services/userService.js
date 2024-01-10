export const getUserByEmail = (email) => {
	return fetch(`http://localhost:####/users?email=${email}`).then((res) =>
		res.json()
	)
}
