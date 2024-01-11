export const getUserByEmail = async (email) => {
	return await fetch(`http://localhost:8088/users?email=${email}`).then((res) => res.json())
}
