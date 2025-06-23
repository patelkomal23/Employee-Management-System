import React from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import Header from '../../components/Shared/Header';
import { useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const { employees } = useSelector((state) => state.employee);
  const { tasks } = useSelector((state) => state.task);

  // Count by task status
  const statusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'Pending').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'In Progress').length },
    { name: 'Completed', value: tasks.filter(t => t.status === 'Completed').length },
  ];

  // Task count per employee
  const employeeTaskCount = employees.map(emp => ({
    name: emp.name,
    tasks: tasks.filter(t => t.assignee === emp.email).length,
  }));

  return (
    <div className="d-flex">
      <Sidebar role="admin" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <h3>📊 Admin Dashboard Analytics</h3>

          {/* Pie Chart - Task Status */}
          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Task Distribution by Status</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Tasks per Employee */}
            <div className="col-md-6">
              <h5>Tasks Assigned per Employee</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={employeeTaskCount}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tasks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary p-3">
                <h5>Total Employees</h5>
                <h3>{employees.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning p-3">
                <h5>Total Tasks</h5>
                <h3>{tasks.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-info p-3">
                <h5>Pending</h5>
                <h3>{statusData[0].value}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success p-3">
                <h5>Completed</h5>
                <h3>{statusData[2].value}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
