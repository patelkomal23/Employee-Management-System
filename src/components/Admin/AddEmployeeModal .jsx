import React, { useState, useEffect } from "react";

const AddEmployeeModal = ({ show, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "employee",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = () => {
    if (!form.name || !form.email) return alert("All fields are required");
    onSave({ ...form, id: form.id || Date.now() });
    onClose();
    setForm({ id: "", name: "", email: "", role: "employee" });
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "#00000088" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{editData ? "Edit" : "Add"} Employee</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select
              className="form-control"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
             <select
              className="form-control"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
                <input
              className="form-control mb-2"
              placeholder="Dep"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
               <input
              className="form-control mb-2"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />
            <input
              className="form-control mb-2"
              placeholder="Bonous"
              value={form.bonous}
              onChange={(e) => setForm({ ...form, bonous: e.target.value })}
            />
               <input
              className="form-control mb-2"
              placeholder="hra"
              value={form.hra}
              onChange={(e) => setForm({ ...form, hra: e.target.value })}
            />
              <input
              className="form-control mb-2"
              placeholder="da"
              value={form.da}
              onChange={(e) => setForm({ ...form, da: e.target.value })}
            />
              
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
