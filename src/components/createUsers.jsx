import React, { useState } from "react";
import { useUserStore } from "../zustand/createUser";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    age: "",
    gender: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { users, addUser, removeUser, updateUser } = useUserStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    const { fname, lname, age, gender } = formData;
    if (fname && lname && age && gender) {
      if (isEdit) {
        updateUser(editIndex, formData);
        setIsEdit(false);
        setEditIndex(null);
      } else {
        addUser(formData);
      }
      setFormData({ fname: "", lname: "", age: "", gender: "" });
    }
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setFormData(userToEdit);
    setIsEdit(true);
    setEditIndex(index);
  };

  const handleDeleteUser = (index) => {
    removeUser(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-50 to-pink-100 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 p-8">
      <div className="w-full lg:w-1/4 bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? "Edit User" : "Create User"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          onClick={handleAddUser}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition"
        >
          {isEdit ? "Update User" : "Add User"}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.fname} {user.lname}
              </h3>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Gender: {user.gender}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEditUser(index)}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(index)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateUser;
