import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { OrdersList } from "../components/orders/OrdersList"
import { NavBar } from "../components/nav/NavBar.js"
import { CreateOrder } from "../components/orders/CreateOrder.js"
import { EmployeesList } from "../components/employees/EmployeesList.js"
import { SalesList } from "../components/sales/SalesList.js"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

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
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<OrdersList />} />
        <Route index path="allOrders" element={<OrdersList />} />
        <Route path="createOrder" element={<CreateOrder />} />
        <Route path="employees" element={<EmployeesList />} />
        <Route path="salesReport" element={<SalesList />} />
      </Route>
    </Routes>
  )
}
