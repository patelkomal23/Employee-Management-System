import React, { useState, useEffect } from 'react';

const AddTaskModal = ({ show, onClose, onSave, editData, employees }) => {
  const [form, setForm] = useState({ id: "", title: "", assignee: "", deadline: "", status: "Pending" });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = () => {
    if (!form.title || !form.assignee || !form.deadline) return alert("All fields required");
    onSave({ ...form, id: form.id || Date.now() });
    onClose();
    setForm({ id: "", title: "", assignee: "", deadline: "", status: "Pending" });
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "#00000088" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{editData ? "Edit" : "Assign"} Task</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input className="form-control mb-2" placeholder="Task Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <select className="form-control mb-2" value={form.assignee} onChange={e => setForm({ ...form, assignee: e.target.value })}>
              <option value="">-- Select Employee --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.email}>{emp.name}</option>
              ))}
            </select>
            <input className="form-control mb-2" type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
            <select className="form-control" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option>
              <option >In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
