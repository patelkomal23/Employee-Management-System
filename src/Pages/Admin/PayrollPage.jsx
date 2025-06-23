import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Shared/Sidebar';
import Header from '../../components/Shared/Header';
import { useSelector } from 'react-redux';
// import './PayrollPage.css'; // Optional: your custom modal styling

const PayrollPage = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const { employees } = useSelector((state) => state.employee);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [salaries, setSalaries] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("salaries")) || {};
    setSalaries(stored);
  }, []);

  const handleSalaryChange = (id, value) => {
    setSalaries((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [month]: value
      }
    }));
  };

  const handleGenerate = () => {
    localStorage.setItem("salaries", JSON.stringify(salaries));
    setShowSaveModal(true);
  };

  const handleViewSlip = (emp) => {
    setSelectedEmployee(emp);
    setShowSlipModal(true);
  };

  const closeSlipModal = () => {
    setShowSlipModal(false);
    setSelectedEmployee(null);
  };

  const closeSaveModal = () => {
    setShowSaveModal(false);
  };

  return (
    <div className="d-flex">
      <Sidebar role="admin" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <h4>💰 Payroll Management</h4>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="month"
              className="form-control"
              style={{ width: "200px" }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleGenerate}>
              💾 Save Payroll
            </button>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Salary (₹)</th>
                <th>View Slip</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={salaries[emp.id]?.[month] || ''}
                      onChange={(e) => handleSalaryChange(emp.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleViewSlip(emp)}
                      disabled={!salaries[emp.id]?.[month]}
                    >
                      👁️ View Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Salary Slip Modal */}
        {showSlipModal && selectedEmployee && (
          <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Salary Slip - {month}</h5>
                  <button type="button" className="btn-close" onClick={closeSlipModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Employee Name:</strong> {selectedEmployee.name}</p>
                  <p><strong>Email:</strong> {selectedEmployee.email}</p>
                  <p><strong>Role:</strong> {selectedEmployee.role}</p>
                  <p><strong>Salary (₹):</strong> {salaries[selectedEmployee.id]?.[month]}</p>
                  <p><strong>Generated On:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeSlipModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Saved Modal */}
        {showSaveModal && (
          <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-success">✅ Payroll Saved</h5>
                  <button type="button" className="btn-close" onClick={closeSaveModal}></button>
                </div>
                <div className="modal-body">
                  <p>The payroll for <strong>{month}</strong> has been saved successfully!</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={closeSaveModal}>OK</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PayrollPage;
