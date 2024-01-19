import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./EmployeeForm.css"
import {
	editEmployeeInfo,
	getEmployeeById,
} from "../../services/employeeService"

export const EmployeeForm = () => {
	const [currentEmployee, setCurrentEmployee] = useState(undefined)

	const { employeeId } = useParams()

	const navigate = useNavigate()

	useEffect(() => {
		getEmployeeById(employeeId).then((data) => {
			setCurrentEmployee(data)
		})
	}, [employeeId])
	console.log(currentEmployee)

	const handleEmployeeEdit = (event) => {
		event.preventDefault()
		const newEmployeeObj = {
			id: currentEmployee.id,
			name: currentEmployee.name,
			address: currentEmployee.address,
			phoneNumber: parseInt(currentEmployee.phoneNumber),
			email: currentEmployee.email,
			isAdmin: currentEmployee.isAdmin,
		}
		editEmployeeInfo(newEmployeeObj).then(() => {
			navigate(`/employees`)
		})
	}
	const handleInputChange = (event) => {
		const stateCopy = { ...currentEmployee }
		stateCopy[event.target.name] = event.target.value
		setCurrentEmployee(stateCopy)
	}

	return (
		<form>
			<h2>Update Profile</h2>
			<fieldset>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						required
						className="form-control"
						value={currentEmployee?.name}
						onChange={handleInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label>Address:</label>
					<input
						type="text"
						name="address"
						required
						className="form-control"
						value={currentEmployee?.address}
						onChange={handleInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label>Phone Number:</label>
					<input
						type="text"
						name="phoneNumber"
						required
						className="form-control"
						value={currentEmployee?.phoneNumber}
						onChange={handleInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label>Email:</label>
					<input
						type="text"
						name="email"
						required
						className="form-control"
						value={currentEmployee?.email}
						onChange={handleInputChange}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<button className="form-btn btn-primary" onClick={handleEmployeeEdit}>
						Save Profile
					</button>
				</div>
			</fieldset>
		</form>
	)
}
