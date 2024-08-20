import React, { useState, useRef, useEffect } from "react";

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

  // Show password
  const showPassword = () => {
    alert("show the password");
    // Toggle function between - eye and eyecross
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/eyecross.png";
    }
  };

  // Saving Password - on local storage
  const savePaswsword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log(passwordArray);
  };

  // Handling forms
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // "...form" for spreading form using spread operator
  };

  return (
    <div>
      {/* Background - ibelick  */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Manager */}
      <div className=" mycontainer">
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
          />
          <div className="flex w-full justify-between gap-8">
            {/* Username  */}
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full p-4 py-1 "
              placeholder="Enter Username"
              type="text"
              name="username"
            />
            {/* Password  */}
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1 "
                placeholder="Enter Password"
                type="text"
                name="password"
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
            className="flex justify-center items-center gap-2 bg-green-500 rounded-full px-8 py-2 w-fit border-2 border-green-500"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#242424"
            ></lord-icon>
            Add Password
          </button>
        </div>

        {/* Displaying passwords from local storage */}
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && 
            <table className="table-auto w-full rounded-md overflow-hidden">
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
                  return
                  <tr key={index}>
                    <td className="py-2 border border-white text-center w-32"><a href={item.site}>{item.site}</a></td>
                    <td className="py-2 border border-white text-center w-32">{item.username}</td>
                    <td className="py-2 border border-white text-center w-32">{item.password}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </div>
  );
};

export default Manager;
