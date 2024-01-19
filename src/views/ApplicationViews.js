import { useEffect, useState } from "react"
import { AdminViews } from "./AdminViews.js"
import { EmployeeViews } from "./EmployeeViews.js"

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState({})
	const [currentOrderID, setCurrentOrderID] = useState(0)

	useEffect(() => {
		// get logged in user from local storage
		const localShepardUser = localStorage.getItem("shepard_user")
		const shepardUserObj = JSON.parse(localShepardUser)

		setCurrentUser(shepardUserObj)
	}, [])

	if (currentUser.isAdmin) {
		return (
			<AdminViews
				currentUser={currentUser}
				setCurrentOrderID={setCurrentOrderID}
				currentOrderID={currentOrderID}
			/>
		)
	} else {
		return (
			<EmployeeViews
				currentUser={currentUser}
				setCurrentOrderID={setCurrentOrderID}
				currentOrderID={currentOrderID}
			/>
		)
	}
}
