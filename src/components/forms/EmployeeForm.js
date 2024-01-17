import { useEffect, useState } from "react"

export const EmployeeForm = (employee) => {
  const { employeeObj } = employee.location.state
  console.log(employeeObj)
  return (
    <form>
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={<></>}
            onChange={<></>}
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
            value={<></>}
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
            value={<></>}
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
            value={<></>}
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
