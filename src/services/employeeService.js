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
