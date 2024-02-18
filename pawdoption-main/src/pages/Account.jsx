// Account.jsx
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import ChangePassword from "../components/ChangePassword";

function Account() {
  const { user } = useUserContext();
  const [userImgUrl, setUserImgUrl] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [update, setUpdate] = useState(false);
  const [hiddenClass, setHiddenClass] = useState(true);
  const [hiddennClass, setHiddennClass] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  function handleUpdate() {
    setUpdate(true);
    setHiddenClass(false);
    setHiddennClass(true);
  }
  function handleCloseUpdate() {
    setUpdate(false);
    setHiddenClass(true);
    setHiddennClass(false);
  }
  function handleOpenChangePasswordModal() {
    setShowChangePasswordModal(true);
  }

  function handleCloseChangePasswordModal() {
    setShowChangePasswordModal(false);
  }
  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseChangePasswordModal();
    }
  };

  let toggleClassHiddenn = hiddennClass ? "" : "hidden";
  useEffect(() => {
    if (user) {
      setUserImgUrl(user.userImgUrl || "");
      setName(user.name || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setContact(user.contact || "");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("UserImg", userImgUrl);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("contact", contact);
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/update-user-profile/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Profile Updated");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this account?"
      );
      if (!answer) return;
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete-user-profile/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("userToken");
        toast.success("User deleted");
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <div
      className={`relative bg-gray-100 min-h-screen ${
        showChangePasswordModal ? "overflow-hidden" : ""
      }`}
    >
      <PageNav />
      <div className=" mx-auto mt-10 p-4 bg-white rounded-lg shadow-md lg:py-10 lg:px-[10rem]">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden border-4 border-white">
              <img
                src={user.userImgUrl}
                alt="userimage"
                className="h-32 w-32 object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none"
            >
              Edit Profile
            </button>
            <button
              onClick={handleOpenChangePasswordModal}
              className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-8 ">
          <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
          <div className="md:grid grid-cols-2 gap-4">
            <div className="mb-4 flex gap-3">
              <label className="block text-gray-600">Email:</label>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <label className="block text-gray-600">Address:</label>
              <p className="text-gray-800">{user.address}</p>
            </div>
            <div className="mb-4 flex gap-3">
              <label className="block text-gray-600">Contact:</label>
              <p className="text-gray-800">{user.contact}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`profile-edit-form ${toggleClassHiddenn} mx-auto mt-8 bg-white p-4 rounded-lg shadow-md`}
      >
        <form className="grid grid-cols-3 gap-5 font-semibold">
          <img
            src={`${user.userImgUrl}`}
            alt="userProfile"
            className="h-[6rem] md:h-[10rem]  px-7 rounded-2xl border-2 border-black overflow-hidden ml-10"
          />

          <div className="col-span-3 lg:col-span-2 flex gap-3 items-center">
            <label htmlFor="UserImg">Profile Picture :</label>
            <input
              type="file"
              id="UserImg"
              accept="image/*"
              onChange={(e) => {
                setUserImgUrl(e.target.files[0]);
              }}
              className="col-span-1 border-2 h-10 rounded-xl border-gray-400"
            />
          </div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="email">E-mail :</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            id="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
          />
          <label htmlFor="contact">Contact :</label>
          <input
            type="text"
            id="contact"
            onChange={(e) => {
              setContact(e.target.value);
            }}
            value={contact}
            className="col-span-2 border-2  rounded-xl border-gray-400 py-1 px-5"
          />
          <div className="col-span-3 flex justify-between ">
            <button
              onClick={handleSubmit}
              className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus:outline-none "
            >
              Update Profile
            </button>
            <button
              onClick={handleDelete}
              className="  bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none"
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-end mx-auto my-8">
        <button
          className={`${toggleClassHiddenn} bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none`}
          onClick={handleCloseUpdate}
        >
          Cancel
        </button>
      </div>
      {showChangePasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-gray-900 modal-overlay"
          onClick={handleModalOutsideClick}
        >
          <div className="bg-white p-4 rounded-lg shadow-md w-96">
            <button
              onClick={handleCloseChangePasswordModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Close
            </button>
            <ChangePassword
              handleCloseChangePasswordModal={handleCloseChangePasswordModal}
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Account;
