import React from "react";
import { Github, Mail, Home, Info } from "lucide-react";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                <div className="text-xl font-bold">LeetCode Explanations</div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-300"><Home size={24} /></a>
                    <a href="#" className="hover:text-gray-300"><Info size={24} /></a>
                    <a href="#" className="hover:text-gray-300"><Mail size={24} /></a>
                    <a href="#" className="hover:text-gray-300"><Github size={24} /></a>
                </div>
            </nav>
        </header>
    );
}

export default Header;