import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword({ handleCloseChangePasswordModal }) {
  const [old_password, setOld_Password] = useState("");
  const [new_password, setNew_Password] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("old_password", old_password);
      formData.append("new_password", new_password);

      const token = localStorage.getItem("userToken");
      const response = await fetch("http://127.0.0.1:8000/api/password/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        handleCloseChangePasswordModal();
        localStorage.removeItem("userToken");
        navigate("/login");
      } else {
        toast.error("Error changing password. Please try again.");
      }
    } catch (error) {
      toast.error("Error changing password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <button
          onClick={handleCloseChangePasswordModal}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="old_password" className="mb-2">
          Old Password
        </label>
        <input
          type="password"
          id="old_password"
          value={old_password}
          onChange={(e) => setOld_Password(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4"
          required
        />
        <label htmlFor="new_password" className="mb-2">
          New Password
        </label>
        <input
          type="password"
          id="new_password"
          value={new_password}
          onChange={(e) => setNew_Password(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4"
          required
        />
        <label className="mb-2">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-4"
          required
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCloseChangePasswordModal}
            className="text-gray-600 hover:text-gray-800 mr-4 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
