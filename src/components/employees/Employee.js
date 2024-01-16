export const Employee = ({ employee }) => {
  return (
    <div className="employee" key={employee.id}>
      <div className="employee-block">
        <div className="employee-name">{employee.name}</div>
      </div>
    </div>
  )
}
