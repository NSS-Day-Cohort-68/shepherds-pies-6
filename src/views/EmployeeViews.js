import { Outlet, Route, Routes } from "react-router-dom"
import { AdminNav } from "../components/nav/AdminNav.js"
import { CreatePizza } from "../components/pizzas/CreatePizza.js"
import { ShowOrder } from "../components/orders/CreateOrder.js"
import { EditOrder } from "../components/orders/EditOrder.js"
import { OrderDetails } from "../components/orders/OrderDetails.js"
import { OrdersList } from "../components/orders/OrdersList.js"
import { EmployeeNav } from "../components/nav/EmployeeNav.js"
// import { EmployeesList } from "../components/employees/EmployeesList.js"
// import { SalesList } from "../components/sales/SalesList.js"

export const EmployeeViews = ({
	currentUser,
	setCurrentOrderID,
	currentOrderID,
}) => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<EmployeeNav />
						<Outlet />
					</>
				}
			>
				<Route index element={<OrdersList />} />

				<Route path="allOrders">
					<Route index element={<OrdersList />} />
					<Route path=":orderId" element={<OrderDetails />} />
				</Route>

				<Route path="editOrder">
					<Route path=":orderId" element={<EditOrder />} />
				</Route>

				<Route
					path="showOrder"
					element={
						<ShowOrder
							currentUser={currentUser}
							setCurrentOrderID={setCurrentOrderID}
							currentOrderID={currentOrderID}
						/>
					}
				/>

				{/* <Route path="employees" element={<EmployeesList />} />
			<Route path="salesReport" element={<SalesList />} /> */}
				<Route
					path="createPizza"
					element={<CreatePizza currentOrderID={currentOrderID} />}
				/>
			</Route>
		</Routes>
	)
}
