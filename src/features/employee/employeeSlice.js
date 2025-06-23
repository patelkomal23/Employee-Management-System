import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: JSON.parse(localStorage.getItem("employees")) || [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
        localStorage.setItem("employees", JSON.stringify(state.employees));
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
