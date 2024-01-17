import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeById } from "../../services/employeeService"

export const EmployeeForm = () => {
  const [currentEmployee, setCurrentEmployee] = useState(undefined)
  const [newName, setNewName] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState(0)
  const [newEmail, setNewEmail] = useState("")
  const [newAdmin, setNewAdmin] = useState(false)

  const { employeeId } = useParams()

  useEffect(() => {
    getEmployeeById(employeeId).then((data) => {
      setCurrentEmployee(data)
    })
  }, [employeeId])

  const handleEmployeeEdit = (event) => {
    event.preventDefault()
    const newEmployeeObj = {
        name: newName,
        address: newAddress,
        phoneNumber: newPhoneNumber,
        email: newEmail,
        isAdmin:, 
    }
  }
  console.log(currentEmployee)

  return (
    <form>
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={currentEmployee?.name}
            onChange={(event) => {
              setNewName(event.target.value)
            }}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={currentEmployee?.address}
            onChange={<></>}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="number"
            name="phone"
            value={currentEmployee?.phoneNumber}
            onChange={<></>}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={currentEmployee?.email}
            onChange={<></>}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={<></>}>
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  )
}
