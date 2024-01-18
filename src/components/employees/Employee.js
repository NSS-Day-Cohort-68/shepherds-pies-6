import { useNavigate } from "react-router-dom"

export const Employee = ({ employee, currentUser }) => {
  const navigate = useNavigate()

  return (
    <div className="employee" key={employee.id}>
      <div className="employee-block">
        <div className="employee-name">{employee.name}</div>
      </div>
      {/* check whether user is a admin */}
      <button
        onClick={() => {
          navigate(`/employee-detail-form/${employee.id}`)
        }}
      >
        Edit
      </button>
    </div>
  )
}
