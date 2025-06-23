import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../../features/task/taskSlice';
import AddTaskModal from '../../components/Admin/AddTaskModal';
import Sidebar from '../../components/Shared/Sidebar';
import Header from '../../components/Shared/Header';

const TaskManagement = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.task);
  const employees = useSelector(state => state.employee.employees);
  const user = JSON.parse(localStorage.getItem("authUser"));


  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSave = (task) => {
    editData ? dispatch(updateTask(task)) : dispatch(addTask(task));
  };

  const handleEdit = (task) => {
    setEditData(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) dispatch(deleteTask(id));
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <div className="d-flex justify-content-between mb-3">
            <h4>Task Management</h4>
            <button className="btn btn-primary" onClick={() => { setEditData(null); setShowModal(true); }}>Assign Task</button>
          </div>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.assignee}</td>
                  <td>{task.deadline}</td>
                  <td >{task.status}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(task)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && <tr><td colSpan="6">No tasks assigned.</td></tr>}
            </tbody>
          </table>
        </div>
        <AddTaskModal show={showModal} onClose={() => setShowModal(false)} onSave={handleSave} editData={editData} employees={employees} />
      </div>
    </div>
  );
};

export default TaskManagement;
