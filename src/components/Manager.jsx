import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // for copy Text - useRef hook
  const copyRef = useRef(null);

  // Show password
  const showPassword = () => {
    // Toggle function between - eye and eyecross
    if (ref.current.src.includes("icons/eyecross.png")) {
        ref.current.src = "icons/eye.png";
        passwordRef.current.type = "password"
    } else {
        ref.current.src = "icons/eyecross.png";
        passwordRef.current.type = "text"  
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

  // Copy Text
  const copyText = (text) => {
    toast('Copied to clipboard!', {
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
    navigator.clipboard.writeText(text)
        
}


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
      <div className="absolute top-0 z-[-2] h-full w-full bg-slate-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

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
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full p-4 py-1 "
                placeholder="Enter Password"
                type="password"
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
        {/* <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && 
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site Name</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className=" relative py-2 border  border-white text-center w-32">
                    <a href={item.site} target="_blank">{item.site}</a>
                      <button ref={copyRef} className="size-7 cursor-pointer absolute top-0 right-0 text-gray-500" onClick={() => { copyText(item.site) }}>copy</button></td>
                    <td className="relative py-2 border  border-white text-center w-32">{item.username} 
                      <button ref={copyRef} className="size-7 cursor-pointer absolute top-0 right-0 text-gray-500" onClick={()=> { copyText(item.username) }}>copy</button></td>
                    <td className="relative py-2 border  border-white text-center w-32">{item.password} 
                      <button ref={copyRef} className="size-7 cursor-pointer absolute top-0 right-2 text-gray-500" onClick={()=> { copyText(item.password) }}>copy</button></td>
                  </tr>;
                })}
              </tbody>
            </table>
          }
        </div>
      </div> */}


<div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className=' relative flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer absolute top-0 right-0 text-gray-500' onClick={() => { copyText(item.site) }}>
                                                copy
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='relative flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer absolute top-0 right-0 text-gray-500' onClick={() => { copyText(item.username) }}>
                                                copy
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='relative flex items-center justify-center '>
                                            <span>{item.password}</span>
                                            <div className=' size-7 cursor-pointer absolute top-0 right-0 text-gray-500' onClick={() => { copyText(item.password) }}>
                                                copy
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>


    </>
  );
};

export default Manager;
