export const getAllEmployees = () => {
  return fetch(`http://localhost:8088/employees`).then((response) =>
    response.json()
  )
}
export const getEmployeeById = (employeeId) => {
  return fetch(`http://localhost:8088/employees/${employeeId}`).then(
    (response) => response.json()
  )
}

export const editEmployeeInfo = (employee) => {
  return fetch(`http://localhost:8088/employees/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  })
}
