'use client'
import React from 'react';
import Link from 'next/link';
import { HiHome, HiOutlineBookOpen, HiClock, HiMenuAlt2, HiChevronLeft } from 'react-icons/hi';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white
            ${isOpen ? 'w-52 md:w-80' : 'w-20'} transition-all duration-300 ease-in-out
            fixed left-0 top-0 shadow-xl z-20
            ${isOpen ? 'translate-x-0' : 'sm:translate-x-0 -translate-x-full'}`}>
            
            {/* Toggle Button - Fixed positioning */}
            <button 
                onClick={toggleSidebar} 
                className={`absolute top-5 
                    ${isOpen 
                        ? 'right-4' // Move inside the sidebar when open
                        : 'sm:right-0 right-full translate-x-[40px]'} // Position outside the sidebar when closed
                    p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-md`}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? <HiChevronLeft size={20} /> : <HiMenuAlt2 size={20} />}
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center h-24 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
                        <span className="text-xl font-bold">M</span>
                    </div>
                    {isOpen && (
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Mood
                        </h1>
                    )}
                </div>
            </div>

            {/* Rest of the component remains unchanged */}
            {/* Links */}
            <nav className="flex flex-col mt-8 space-y-2 px-3 sm:px-4">
                <Link 
                    href="/" 
                    className={`flex items-center py-3 px-4 rounded-lg font-medium hover:bg-gray-700/50 transition-all
                        ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
                >
                    <HiHome size={22} className="text-blue-400 min-w-[22px] min-h-[22px]" />
                    {isOpen && <span>Home</span>}
                </Link>
                <Link 
                    href="/journal" 
                    className={`flex items-center py-3 px-4 rounded-lg font-medium hover:bg-gray-700/50 transition-all
                        ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
                >
                    <HiOutlineBookOpen size={22} className="text-purple-400 min-w-[22px] min-h-[22px]" />
                    {isOpen && <span>Journal</span>}
                </Link>
                <Link 
                    href="/history" 
                    className={`flex items-center py-3 px-4 rounded-lg font-medium hover:bg-gray-700/50 transition-all
                        ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
                >
                    <HiClock size={22} className="text-green-400 min-w-[22px] min-h-[22px]" />
                    {isOpen && <span>History</span>}
                </Link>
            </nav>

            {/* Footer */}
            {isOpen && (
                <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-700/50">
                    <p>Mood Journal v1.0</p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;