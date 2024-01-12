import { useEffect, useState } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { CreatePizza } from '../components/pizzas/CreatePizza'

export const ApplicationViews = () => {
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		// get logged in user from local storage
		const localUser = localStorage.getItem('shepard_user')
		setCurrentUser(JSON.parse(localUser)) // { id: n }
	}, [])

	return (
		<Routes>
			<Route
				path='/'
				element={
					<>
						{/* <NavBar /> */}
						<CreatePizza />
						<Outlet />
					</>
				}
			>
				{/* <Route index element={<OrdersList />} /> */}
			</Route>
		</Routes>
	)
}
