
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Login } from "./components/login/Login.js"
import { Register } from "./components/login/Register.js"
import { Authorized } from "./components/login/Authorized.js"
import { ApplicationViews } from "./views/ApplicationViews.js"

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route
				path="*"
				element={
					<Authorized>
						<ApplicationViews />
					</Authorized>
				}
			/>
		</Routes>
	)
}

export default App


// import { Route, Routes } from "react-router-dom"
// import "./App.css"
// import { Login } from "./components/login/Login.js"
// import { Register } from "./components/login/Register.js"
// import { Authorized } from "./views/Authorized.js"
// import { ApplicationViews } from "./views/ApplicationViews.js"

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="*"
//         element={
//           <Authorized>
//             <ApplicationViews />
//           </Authorized>
//         }
//       />
//     </Routes>
//   )
// }

// export default App
