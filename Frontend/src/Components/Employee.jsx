import { useState, useEffect, useRef } from "react";
import "../Styles/Employee.css";
import calendar from "../assets/calendar.png";
import dashboard from "../assets/dashboard.png";
import employeeIcon from "../assets/employee.png";
import message from "../assets/message.png";
import imageupload from "../assets/imageupload.png";
import DP from "../assets/dp.jpg";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Employee() {
  const [type, setType] = useState("table");
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/employee");
      const data = await res.json();
      if (Array.isArray(data)) setEmployees(data);
      else setEmployees([]);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleCancel = () => {
    setType("table");
    setFormData({
      id: "",
      name: "",
      employee_id: "",
      department: "",
      designation: "",
      project: "",
      type: "",
      status: "",
    });
    setSelectedImage(null);
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) data.append("image", imageFile);

    try {
      let res;
      if (type === "edit") {
        res = await fetch(`http://localhost:5000/employees/${formData.id}`, {
          method: "PUT",
          body: data,
        });
      } else {
        res = await fetch("http://localhost:5000/employees", {
          method: "POST",
          body: data,
        });
      }

      if (!res.ok) throw new Error("Failed to save employee");
      await fetchEmployees();
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (emp) => {
    setFormData({ ...emp });
    setSelectedImage(
      emp.image_path ? `http://localhost:5000${emp.image_path}` : null
    );
    setType("view");
  };

  const handleEdit = (emp) => {
    setFormData({ ...emp });
    setSelectedImage(
      emp.image_path ? `http://localhost:5000${emp.image_path}` : null
    );
    setType("edit");
  };

  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/employees/${selectedDeleteId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete employee");
      await fetchEmployees();
      setShowDeleteConfirm(false);
      setSelectedDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedDeleteId(null);
  };

  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="totalpage">
      <div className="left">
        <div>
          <img
            src={dashboard || "/placeholder.svg"}
            alt=""
            width="40"
            height="40"
          />
          <p>Dashboard</p>
        </div>

        <div className="ec">
          <img
            src={employeeIcon || "/placeholder.svg"}
            alt=""
            width="35"
            height="35"
          />
          <p>Employee</p>
        </div>

        <div>
          <img
            src={calendar || "/placeholder.svg"}
            alt=""
            width="35"
            height="35"
          />
          <p>Calendar</p>
        </div>

        <div>
          <img
            src={message || "/placeholder.svg"}
            alt=""
            width="35"
            height="35"
          />
          <p>Message</p>
        </div>

      </div>

      <div className="right">
        {type === "table" && (
          <>
            <div className="employee-header">
              <h1>Employee</h1>
              <div className="employee-addition">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-box"
                />
                <button className="add-btn" onClick={() => setType("form")}>
                  + Add New Employee
                </button>
              </div>
            </div>

            <div className="employee-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee ID</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Project</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length ? (
                    employees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="employee-name">
                          {emp.image_path && (
                            <img
                              src={`http://localhost:5000${emp.image_path}`}
                              alt=""
                              width="40"
                              height="40"
                              style={{
                                borderRadius: "25px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          <span>{emp.name}</span>
                        </td>
                        <td>{emp.employee_id}</td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.project}</td>
                        <td>{emp.type}</td>
                        <td>{emp.status}</td>
                        <td className="actionicons">
                          <FaEye onClick={() => handleView(emp)} />
                          <FaEdit onClick={() => handleEdit(emp)} />
                          <FaTrash onClick={() => handleDelete(emp.id)} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="norecords">
                        <h2>No records found</h2>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(type === "form" || type === "edit" || type === "view") && (
          <div className="newemployee">
            <div>
              <h1>
                <button onClick={handleCancel}>{"<"}</button>

                {type === "form" && "Add New Employee Details"}
                {type === "edit" && "Edit Employee Details"}
                {type === "view" && "View Employee Details"}
              </h1>

              <h3>
                <img
                  src={DP || "/placeholder.svg"}
                  alt=""
                  height="20"
                  width="30"
                />
                Personal Information
              </h3>
            </div>

            <div
              className="uploadimg"
              onClick={type !== "view" ? handleImageClick : null}
            >
              <img
                src={selectedImage || imageupload}
                alt="Upload"
                width="80"
                height="80"
                style={{ borderRadius: "10px", objectFit: "cover",border:"1px solid grey" }}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
              disabled={type === "view"}
            />

            <div className={`newdata ${type === "view" ? "view-mode" : ""}`}>
              <form onSubmit={handleSubmit}>
                <div className="details">
                  {[
                    "name",
                    "employee_id",
                    "department",
                    "designation",
                    "project",
                    "type",
                    "status",
                  ].map((field) => (
                    <div key={field}>
                      <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>

                      {type === "view" ? (
                        <div className="view-value">{formData[field]}</div>
                      ) : field === "department" ||
                        field === "designation" ||
                        field === "type" ||
                        field === "status" ? (
                        <select
                          id={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                        >
                          <option value="">Select {field}</option>
                          {field === "department" &&
                            ["Design","HR", "IT", "Finance", "Marketing"].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          {field === "designation" &&
                            ["Developer","Manager", "Engineer", "Analyst", "Intern"].map(
                              (opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              )
                            )}
                          {field === "type" &&
                            ["Full-Time", "Part-Time", "Permanent"].map(
                              (opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              )
                            )}
                          {field === "status" &&
                            ["Office", "Hybrid", "WFH"].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                        </select>
                      ) : (
                        <input
                          type={field === "employee_id" ? "number" : "text"}
                          id={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="insertion">
                  {type === "view" ? (
                    <button type="button" onClick={handleCancel}>
                      Back
                    </button>
                  ) : (
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  )}
                  {type !== "view" && (
                    <button className="cbutton" type="submit">
                      Confirm
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Are you sure you want to delete this employee?</h3>
              <div className="popup-buttons">
                <button onClick={confirmDelete} className="confirm-btn">
                  Yes
                </button>
                <button onClick={cancelDelete} className="cancel-btn">
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
