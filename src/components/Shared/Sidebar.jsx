import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaTasks, FaMoneyCheckAlt, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar bg-dark text-white shadow-lg">
      <h4 className="p-3 border-bottom border-secondary">EMS {role === 'admin' ? 'Admin' : 'Employee'}</h4>
      <ul className="list-unstyled p-2">
        {role === 'admin' ? (
          <>
            <li><Link to="/admin/dashboard" className="sidebar-link"><FaTachometerAlt className="me-2" />Dashboard</Link></li>
            <li><Link to="/admin/employees" className="sidebar-link"><FaUsers className="me-2" />Employees</Link></li>
            <li><Link to="/admin/tasks" className="sidebar-link"><FaTasks className="me-2" />Tasks</Link></li>
            <li><Link to="/admin/payroll" className="sidebar-link"><FaMoneyCheckAlt className="me-2" />Payroll</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/employee/dashboard" className="sidebar-link"><FaTachometerAlt className="me-2" />Dashboard</Link></li>
            <li><Link to="/employee/profile" className="sidebar-link"><FaUserCircle className="me-2" />My Profile</Link></li>
            <li><Link to="/employee/my-tasks" className="sidebar-link"><FaClipboardList className="me-2" />My Tasks</Link></li>
            <li><Link to="/employee/payroll" className="sidebar-link"><FaMoneyCheckAlt className="me-2" />My Payroll</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;