import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, deleteEmployee } from '../features/employee/employeeSlice';
import AddEmployeeModal from '../components/Admin/AddEmployeeModal ';
import Sidebar from '../components/Shared/Sidebar';
import Header from '../components/Shared/Header';

const EmployeeManagement = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const { employees } = useSelector(state => state.employee);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSave = (employee) => {
    if (editData) dispatch(updateEmployee(employee));
    else dispatch(addEmployee(employee));
  };

  const handleEdit = (employee) => {
    setEditData(employee);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) dispatch(deleteEmployee(id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    let sortable = [...employees];
    sortable = sortable.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    sortable.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortable;
  }, [employees, sortConfig, searchTerm]);

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedEmployees.slice(start, start + itemsPerPage);
  }, [sortedEmployees, currentPage]);

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  return (
    <div className="d-flex">
      <Sidebar role="admin" />
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <Header user={user} />
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h4 className="mb-2">Manage Employees</h4>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => { setEditData(null); setShowModal(true); }}>
                Add Employee
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className=" table-responsive table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  {['id', 'name', 'email', 'role', 'department', 'salary', 'bonous', 'hra', 'da'].map(key => (
                    <th key={key} onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                      {key.toUpperCase()} {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role}</td>
                      <td>{emp.department}</td>
                      <td>{emp.salary}</td>
                      <td>{emp.bonous}</td>
                      <td>{emp.hra}</td>
                      <td>{emp.da}</td>
                     
                      <td>
                        <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(emp)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-3">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <AddEmployeeModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editData={editData}
        />
      </div>
    </div>
  );
};

export default EmployeeManagement;
