import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Shared/Sidebar';
import Header from '../components/Shared/Header';
// import './PayrollPage.css'; // same styling as admin if needed

const EmployeePayrollPage = () => {
  const user = JSON.parse(localStorage.getItem("authUser")); // logged-in employee
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [salary, setSalary] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("salaries")) || {};
    const empSalary = stored[user.id]?.[month] || '';
    setSalary(empSalary);
  }, [month, user.id]);

  const handleViewSlip = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex">
      <Sidebar role="employee" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <h4>💵 My Payroll</h4>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="month"
              className="form-control"
              style={{ width: "200px" }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleViewSlip}
              disabled={!salary}
            >
              👁️ View Salary Slip
            </button>
          </div>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Month</th>
                <th>Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{month}</td>
                <td>{user.salary || 'Not Available'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal to view slip */}
        {showModal && (
          <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Your Salary Slip - {month}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Salary:</strong> ₹{salary}</p>
                  <p><strong>Generated On:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployeePayrollPage;
