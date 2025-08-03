import React from 'react'

const Footer = () => {
    return (
        <div className='Footer flex flex-col w-screen bg-slate-600 gap-1 justify-center items-center fixed bottom-0 text-white'>
            <div className="logo font-bold text-2xl ">
                <span className="text-purple-400">&lt;</span>
                Pass
                <span className="text-purple-400">OP/&gt;</span>
            </div>
            <div >
                <p className='flex flex-row'>Created with <img className='w-7' src="/heart.png" alt="love" />by Manveer Jaura</p>
            </div>
        </div>
    )
}

export default Footer
