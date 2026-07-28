import { api } from "../../services/api";

// GET /api/v1/employee/all
export const fetchUsersAPI = () =>
  api.get("/api/v1/employee/all");

// GET /api/v1/vehicles/all
export const fetchVehiclesAPI = () =>
  api.get("/api/v1/vehicles/all");

// POST /api/v1/employee/create
export const createEmployeeAPI = (payload) =>
  api.post("/api/v1/employee/create", payload);

// PATCH /api/v1/employee/:employeeId — update employee details
export const updateEmployeeAPI = (employeeId, payload) => {
  console.log('[UPDATE] PATCH /api/v1/employee/' + employeeId, payload);
  return api.patch(`/api/v1/employee/${employeeId}`, payload);
};

// DELETE /api/v1/employee/:employeeId — delete employee
export const deleteEmployeeAPI = (employeeId) => {
  console.log('[DELETE] DELETE /api/v1/employee/' + employeeId);
  return api.delete(`/api/v1/employee/${employeeId}`);
};
