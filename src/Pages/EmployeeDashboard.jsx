import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Shared/Sidebar';
import Header from '../components/Shared/Header';

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const { tasks } = useSelector((state) => state.task);

  const myTasks = tasks.filter(task => task.assignee === user.email);
  const pending = myTasks.filter(task => task.status === 'Pending').length;
  const inProgress = myTasks.filter(task => task.status === 'In Progress').length;
  const completed = myTasks.filter(task => task.status === 'Completed').length;

  return (
    <div className="d-flex">
      <Sidebar role="employee" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <h4>👨‍💼 Welcome, {user.name}</h4>

          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card bg-warning text-white p-3">
                <h5>Pending Tasks</h5>
                <h3>{pending}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white p-3">
                <h5>In Progress</h5>
                <h3>{inProgress}</h3>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white p-3">
                <h5>Completed</h5>
                <h3>{completed}</h3>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>Your Task List</h5>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {myTasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.deadline}</td>
                  </tr>
                ))}
                {myTasks.length === 0 && (
                  <tr><td colSpan="4">No tasks assigned yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
