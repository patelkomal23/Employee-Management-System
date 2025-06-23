import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Shared/Sidebar';
import Header from '../components/Shared/Header';

const EmployeeTask = () => {
  const user = JSON.parse(localStorage.getItem("authUser")); // logged-in employee
  const { tasks } = useSelector(state => state.task);
  
  // You can match by either name or id depending on how admin assigns tasks
  const myTasks = tasks.filter(task => task.assignee === user.name); // or task.assigneeId === user.id

  return (
    <div className="d-flex">
      <Sidebar role="employee" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <h4>📋 My Assigned Tasks</h4>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.length > 0 ? (
                myTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.deadline}</td>
                    <td>{task.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No tasks assigned to you.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTask;
