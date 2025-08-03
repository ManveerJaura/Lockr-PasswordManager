import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json()
      setpasswordArray(passwords)
    }
    
    useEffect(() => {
        getPasswords()

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "/eyecross.png"
            passwordRef.current.type = "password"

        }

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async() => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
            let res = await fetch("http://localhost:3000/", { method:"POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            // console.log([...passwordArray, {...form, id:uuidv4()}])
            setform({ site: "", username: "", password: "" })
            toast.success('Saved', {
                position: "top-center",
                autoClose: 1700,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }

    }

    const deletePassword = async(id) => {
      console.log("deleting item with id",id)
      setpasswordArray(passwordArray.filter(item=>item.id!=id))
    //   localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)))
    let res = await fetch("http://localhost:3000/", { method:"DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id})})

    toast.success('Deleted', {
        position: "top-center",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
    }
    const editPassword = async(id) => {
      setform(passwordArray.filter(item=>item.id===id)[0])
      setpasswordArray(passwordArray.filter(item=>item.id!=id))
      let res = await fetch("http://localhost:3000/", { method:"DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id})})
    }
    

    const copyText = (text) => {
        toast.success('Copied to Clipboard', {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1700}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>

            <div className="container pt-3 md:mx-auto max-w-full md:max-w-5xl md:mt-8 ">
                <div className=' flex flex-col'>
                    <h1 className='m-auto font-bold text-4xl'>
                        <span className="text-purple-700">&lt;</span>
                        Pass
                        <span className="text-purple-700">OP/&gt;</span>
                    </h1>
                    <p className='m-auto text-purple-900'>Your own Password Manager</p>
                </div>

                <div className="text-black flex flex-col p-4 ">
                    <input name='site' value={form.site} type="text" className="text m-2 rounded-2xl px-3 py-1 border border-purple-800 w-full" placeholder='Enter Website URL' onChange={handleChange} />
                    <div className="flex flex-col md:flex-row md:gap-4 ">
                        <input name='username' value={form.username} type="text" className='m-2 rounded-2xl px-3 py-1 w-full md:w-11/12 border border-purple-800' placeholder='Enter Username' onChange={handleChange} />
                        <div className="relative">
                            <input ref={passwordRef} name='password' value={form.password} type="password" className='m-2 rounded-2xl px-3 py-1 w-full md:w-56 border border-purple-800 mr-0' placeholder='Enter Password' onChange={handleChange} />
                            <span className="absolute right-5 top-4 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} width={20} src="/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="save_btn w-28 h-9 m-auto rounded-3xl bg-purple-500 flex border-purple-950 border-2" onClick={savePassword}>
                    <button className='flex gap-2 m-auto align-bottom pb-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2>Save</h2>
                    </button>
                </div>

                <div className="passwords pt-3">
                    <h2 className='font-bold text-xl py-3'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-purple-600 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-100 text-black'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-white text-center w-32 '>
                                            <div className="flex justify-center gap-3 max-[385px]:flex-col max-[385px]:items-center">
                                                <a href="item.site" target='_blank'>{item.site}</a>
                                                <div className="cursor-pointer " onClick={() => { copyText(item.site) }}>
                                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                        <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div></div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className="flex justify-center gap-3 max-[385px]:flex-col max-[385px]:items-center">
                                                {item.username}
                                                <div className="cursor-pointer" onClick={() => { copyText(item.username) }}>
                                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                        <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'><div className="flex justify-center gap-3 max-[385px]:flex-col max-[385px]:items-center">
                                            {item.password}
                                            <div className="cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                    <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div></td>
                                        <td className='actions py-2 border border-white text-center w-32'>
                                            <div className="action_icons flex justify-center gap-4 max-[385px]:flex-col max-[385px]:items-center">
                                                <div className="edit cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <div className="delete cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                                                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
