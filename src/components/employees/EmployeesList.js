import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService"
import { Employee } from "./Employee"
import { Link } from "react-router-dom"
import "./Employee.css"

export const EmployeesList = () => {
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    getAllEmployees().then((employeeArray) => {
      setAllEmployees(employeeArray)
    })
  }, []) //INTIAL RENDER ONLY

  return (
    <article className="employees">
      <h2 className="header">Employees</h2>
      {allEmployees.map((employeeObj) => {
        return (
          <Link to={`/employees/${employeeObj.id}`}>
            <Employee employee={employeeObj} key={employeeObj.id} />
          </Link>
        )
      })}
    </article>
  )
}
