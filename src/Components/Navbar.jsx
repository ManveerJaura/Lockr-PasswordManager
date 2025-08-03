import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-violet-400 flex justify-around items-center px-4 h-14 text-white gap-24 md:gap-96  '>
            <div className="logo font-bold text-2xl">
                <span className="text-purple-800">&lt;</span>
                Pass
                <span className="text-purple-800">OP/&gt;</span>
            </div>
            <div className="gitlogo w-28 h-10 bg-pink-600 rounded-3xl ring-white ring-1">
            <a href="" target='_blank'>
            <button className='flex justify-center items-center gap-2'>
                <img className='w-8 pt-1 ml-2 ' src="/github.svg" alt="Github Logo" />Github
            </button>
            </a>
             </div>
            
        </nav>
    )
}

export default Navbar
