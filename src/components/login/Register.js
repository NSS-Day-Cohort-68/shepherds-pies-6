import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = () => {
	const [user, setUser] = useState({
		email: "",
		fullName: "",
		address: "",
		phoneNumber: 0,
		isAdmin: false,
	})
	let navigate = useNavigate()

	const registerNewUser = async () => {
		if (
			user.email !== "" &&
			user.fullName !== "" &&
			user.address !== "" &&
			user.phoneNumber !== 0
		) {
			createUser(user).then((createdUser) => {
				if (createdUser.hasOwnProperty("id")) {
					localStorage.setItem(
						"shepard_user",
						JSON.stringify({
							id: createdUser.id,
							isAdmin: createdUser.isAdmin,
						})
					)
				}
			})

			navigate("/")
		}
	}

	const handleRegister = (e) => {
		e.preventDefault()
		getUserByEmail(user.email).then((response) => {
			if (response.length > 0) {
				// Duplicate email. No good.
				window.alert("Account with that email address already exists")
			} else {
				// Good email, create user.
				registerNewUser()
			}
		})
	}

	const updateCustomer = (evt) => {
		const copy = { ...user }
		copy[evt.target.id] = evt.target.value
		setUser(copy)
	}

	return (
		<main style={{ textAlign: "center" }}>
			<form className="form-login" onSubmit={handleRegister}>
				<h1>Shepard's Pies</h1>
				<h2>Please Register</h2>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateCustomer}
							type="text"
							id="fullName"
							className="form-control"
							placeholder="Enter your name"
							required
							autoFocus
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateCustomer}
							type="email"
							id="email"
							className="form-control"
							placeholder="Email address"
							required
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateCustomer}
							type="address"
							id="address"
							className="form-control"
							placeholder="Address"
							required
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<input
							onChange={updateCustomer}
							type="phoneNumber"
							id="phoneNumber"
							className="form-control"
							placeholder="Phone number"
							required
						/>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<label>
							<input
								onChange={(evt) => {
									const copy = { ...user }
									copy.isAdmin = evt.target.checked
									setUser(copy)
								}}
								type="checkbox"
								id="isAdmin"
							/>
							I am an admin{" "}
						</label>
					</div>
				</fieldset>
				<fieldset>
					<div className="form-group">
						<button
							className="login-btn btn-info"
							type="submit"
							onClick={handleRegister}
						>
							Register
						</button>
					</div>
				</fieldset>
			</form>
		</main>
	)
}
