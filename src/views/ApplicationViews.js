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

	// return (
	// 	<Routes>
	// 		<Route
	// 			path="/"
	// 			element={
	// 				<>
	// 					{currentUser.isAdmin ? <AdminNav /> : <EmployeeNav />}
	// 					<Outlet />
	// 				</>
	// 			}
	// 		>
	// 			<Route index element={<OrdersList />} />

	// 			<Route path="allOrders">
	// 				<Route index element={<OrdersList />} />
	// 				<Route path=":orderId" element={<OrderDetails />} />
	// 			</Route>

	// 			<Route path="editOrder">
	// 				<Route path=":orderId" element={<EditOrder />} />
	// 			</Route>

	// 			<Route
	// 				path="showOrder"
	// 				element={
	// 					<ShowOrder
	// 						currentUser={currentUser}
	// 						setCurrentOrderID={setCurrentOrderID}
	// 						currentOrderID={currentOrderID}
	// 					/>
	// 				}
	// 			/>

	// 			<Route path="employees" element={<EmployeesList />} />
	// 			<Route path="salesReport" element={<SalesList />} />
	// 			<Route
	// 				path="createPizza"
	// 				element={<CreatePizza currentOrderID={currentOrderID} />}
	// 			/>
	// 			<Route path="/salesReport2" element={<SalesListTwo />} />
	// 		</Route>
	// 	</Routes>
	// )
}
