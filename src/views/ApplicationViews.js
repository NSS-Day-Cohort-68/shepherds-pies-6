import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.js"
import { OrdersList } from "../components/orders/OrdersList.js"
import { ShowOrder } from "../components/orders/CreateOrder.js"
import { EmployeesList } from "../components/employees/EmployeesList.js"
import { SalesList } from "../components/sales/SalesList.js"
import { CreatePizza } from "../components/pizzas/CreatePizza"
import { EditOrder } from "../components/orders/EditOrder.js"
import { OrderDetails } from "../components/orders/OrderDetails.js"

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState({})
	const [currentOrderID, setCurrentOrderID] = useState(0)

	useEffect(() => {
		// get logged in user from local storage
		const localUser = localStorage.getItem("shepard_user")
		setCurrentUser(JSON.parse(localUser)) // { id: n }
	}, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
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

        <Route path="employees" element={<EmployeesList />} />
        <Route path="salesReport" element={<SalesList />} />
        <Route
          path="createPizza"
          element={<CreatePizza currentOrderID={currentOrderID} />}
        />
      </Route>
    </Routes>
  )
}
