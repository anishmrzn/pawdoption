import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";

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
  let toggleClassHidden = hiddenClass ? "" : "hidden";
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
  return (
    <div className="relative">
      <div>
        <PageNav />
      </div>

      <div
        className={`${toggleClassHidden} ml-[16rem] h-[30rem] w-[50rem] flex items-center justify-between`}
      >
        <div className="w-[20rem] flex flex-col gap-10 text-xl ">
          <h1 className="flex  justify-between">
            <span className="font-bold">Name :</span> <h1>{user.name}</h1>
          </h1>
          <h1 className="flex justify-between">
            <span className="font-bold">Username :</span>
            <h1>{user.username}</h1>
          </h1>
          <h1 className="flex justify-between">
            <span className="font-bold">Email :</span> <h1>{user.email}</h1>
          </h1>
          <h1 className="flex justify-between">
            <span className="font-bold">Address :</span> <h1>{user.address}</h1>
          </h1>
          <h1 className="flex justify-between">
            <span className="font-bold">Contact :</span> <h1>{user.contact}</h1>
          </h1>
        </div>
        <div className="rounded-full px-6 border-2 border-black overflow-hidden mb-[10rem]">
          <img
            src={user.userImgUrl}
            // src="/product.jpg"
            alt="userimage"
            className="h-[10rem] w-full object-cover"
          />
        </div>
      </div>
      <div className={`${toggleClassHiddenn} w-[50rem] ml-[15rem] mt-20`}>
        <form className="grid grid-cols-3 gap-5 font-semibold">
          <img
            src={`${user.userImgUrl}`}
            alt="userProfile"
            className="h-[10rem] px-7 rounded-2xl border-2 border-black overflow-hidden ml-10"
          />

          <div className="col-span-2 flex gap-3 items-center">
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
          <button onClick={handleSubmit} className="button ml-10 mt-10">
            Update Profile
          </button>
        </form>
      </div>
      <div className="flex items-center justify-end mr-[15rem] mb-10">
        <button
          className={`${toggleClassHidden} button`}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className={`${toggleClassHiddenn} button`}
          onClick={handleCloseUpdate}
        >
          Cancel
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Account;
