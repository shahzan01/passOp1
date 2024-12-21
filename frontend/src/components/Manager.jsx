import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {PUBLIC_API_URL} from '../../config';



const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ url: '', username: '', password: '' });
  const [passwordArray, setPasswordArray] = useState([]);
 const [Password, setPassword] = useState(false);
  useEffect(() => {
    fetchPasswords();
  }, []);
const EditPasswordSave=useRef({edit:false,id:null});
  // Fetch passwords from MongoDB
  const fetchPasswords = async () => {
    try {
      const response = await axios.get(`${PUBLIC_API_URL }/api/passwords/all`, {
        headers: {
          token: ` ${localStorage.getItem("token")}`, // Add JWT token
          "Content-Type": "application/json", // Optional: Specify content type
        },
      });
    
      setPasswordArray(response.data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  // Toggle password visibility
  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
    setPassword(!Password)
  };

  // Save password to MongoDB
  const savePassword = async (edit,old) => { 
if(edit){
if(JSON.stringify(old)==JSON.stringify(form)){
  setPasswordArray([...passwordArray,form]);
  setForm({ url: '', username: '', password: '' }); // Clear form
  EditPasswordSave.current.edit=false;
  EditPasswordSave.current.id=null;
}
else{
try{
  const response = await axios.put(`${PUBLIC_API_URL }/api/passwords/edit/${old.id}`,form, {
    headers: {
      token: ` ${localStorage.getItem("token")}`, // Add JWT token
      "Content-Type": "application/json", // Optional: Specify content type
    },
  });
  setForm({ url: '', username: '', password: '' }); 
  fetchPasswords()
}
catch(error){
  console.error('Error saving password:', error);
}

EditPasswordSave.current.edit=false;
EditPasswordSave.current.id=null;

}


}

else{
  
  if (form.url && form.username && form.password) {
     
    try {
    
      await axios.post(`${PUBLIC_API_URL }/api/passwords/add`, form, {
        headers: {
          token: ` ${localStorage.getItem("token")}`, // Add JWT token
          "Content-Type": "application/json", // Optional: Specify content type
        },
      });
      fetchPasswords(); // Fetch updated password list
      setForm({ url: '', username: '', password: '' }); // Clear form
    } catch (error) {
      console.error('Error saving password:', error);
    }
  } else {
    alert('Please fill all the fields');
  }
}
  };

  
  // Delete password
  const deletePassword = async (item) => {
   
    if (item.edit || window.confirm('Are you sure you want to delete this password?')) {
      try {
        await axios.delete(`${PUBLIC_API_URL }/api/passwords/delete/${item.id}`, {
          headers: {
            token: ` ${localStorage.getItem("token")}`, // Add JWT token
            "Content-Type": "application/json", // Optional: Specify content type
          },
        });
        fetchPasswords(); // Fetch updated password list
      } catch (error) {
        console.error('Error deleting password:', error);
      }
    }
  };

  // Edit password
  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter(item => item.id !== id)); // Remove from display
EditPasswordSave.current.edit=true;
EditPasswordSave.current.id=passwordToEdit;

  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Copy text to clipboard
  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer />
      <div className="p-2 md:p-0 md:mycontainer">
        <div><h1 className="sm:text-2xl lg:text-4xl text-sm font-bold text-center"><span className="text-green-700 ">&lt;</span>Pass<span className="text-green-700">OP/&gt;</span></h1>
          <p className="text-green-900 sm:text-base lg:text-lg text-sm text-center">Your own Password Manager</p></div>
        <div className="text-black flex flex-col items-center p-4 gap-8">
          <input
            placeholder="Enter Website URL"
            id="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            className="rounded-full border border-green-500 p-4 py-1 w-full"
            type="text"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
            <input
              placeholder="Enter Username"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 p-4 py-1 w-full"
              type="text"
            />
            <div className="relative">
              <input
                placeholder="Enter Password"
                ref={passwordRef}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 p-4 py-1 w-full"
                type="password"
              />
              <button className="absolute right-[3px] cursor-pointer top-[3px]" onClick={showPassword}>
              {Password ? (
                <img width={26} className="p-1" src="../icons/eye.png" alt="eye" />
              ) : (
                <img width={26} className="p-1" src="../icons/hidden.png" alt="eye" />
              )}
              </button>
            </div>
          </div>
          <button
            onClick={()=>savePassword(EditPasswordSave.current.edit,EditPasswordSave.current.id)}
            className="w-fit gap-2 flex border border-green-900 justify-center items-center hover:bg-green-300 px-5 py-2 bg-green-200 rounded-full"
          >
            <span className="sm:text-base lg:text-lg text-sm">Save Password</span>
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold sm:text-lg lg:text-xl text-base py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full bg-green-100 overflow-hidden mb-10 rounded-md sm:text-base lg:text-lg text-sm">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                        <div className="size-7 cursor-pointer mx-3" onClick={() => copyText(item.url)}>
                          <img src="../icons/copy icon.png" width={20} alt="copy icon" />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        {item.username}
                        <div className="size-7 cursor-pointer mx-3" onClick={() => copyText(item.username)}>
                          <img src="../icons/copy icon.png" width={20} alt="copy icon" />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                      {"*".repeat(item.password.length)}
                        <div className="size-7 cursor-pointer mx-3" onClick={() => copyText(item.password)}>
                          <img src="../icons/copy icon.png" width={20} alt="copy icon" />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      <div className="flex items-center justify-center">
                        <span className="cursor-pointer mx-1" onClick={() => {editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/ghhwiltn.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                            
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1 delete" onClick={() =>{ item.edit=false; deletePassword(item)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
