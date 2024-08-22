import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  // Form Handling - using useState hook
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  // Loading passwords - using useEffect hook
  const [passwordArray, setPasswordArray] = useState([]);

  // Loading password - useEFFect
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // for changing image src of password - using useRef hook
  const ref = useRef(); // -- useRef is a React Hook that lets you reference a value that's not needed for rendering

  // for password - userRef hook
  const passwordRef = useRef();

  // Show password
  const showPassword = () => {
    // Toggle function between - eye and eyecross
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  // Saving Password - on local storage
  const savePaswsword = () => {
    if(form.site.length > 0 && form.username.length > 0 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      console.log(passwordArray);
      setForm({ site: "", username: "", password: "" })
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
        toast('Error: Invalid input!')
    }
  };

  // Edit Password
  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setForm({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
  };
  
  // Delete Password
  const deletePassword = (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you really want to delete this password")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast("Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Handling forms
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // "...form" for spreading form using spread operator
  };

  // Copy Text
  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // Write the text to the clipboard
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      {/* Background - ibelick  */}
      {/* <div className="absolute top-0 z-[-2] h-full w-full bg-slate-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}

      {/* Manager */}
      <div className=" p-2 md:p-0 md:mycontainer min-h-[87.6vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          {/* Site */}
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full p-4 py-1 "
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            {/* Username  */}
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            {/* Password  */}
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1 "
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="show/hidden"
                />
              </span>
            </div>
          </div>

          {/* Add Button - for password */}
          <button
            onClick={savePaswsword}
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-8 py-1 w-fit border border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#242424"
            ></lord-icon>
            Save
          </button>
        </div>

        {/* Displaying passwords from local storage */}
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className=" relative flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer absolute top-0 right-0 text-gray-500"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            copy
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="relative flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="size-7 cursor-pointer absolute top-0 right-0 text-gray-500"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            copy
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="relative flex items-center justify-center ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className=" size-7 cursor-pointer absolute top-0 right-0 text-gray-500"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            copy
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        {/* Edit Button  */}
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {editPassword(item.id);}}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>

                        {/* Delete Button  */}
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {deletePassword(item.id);}}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
