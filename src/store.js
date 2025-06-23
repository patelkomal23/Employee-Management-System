import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employee/employeeSlice';
import authReducer from './features/auth/authSlice';
import taskReducer from './features/task/taskSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer, 
    auth:authReducer,
    task: taskReducer,
  },
});
