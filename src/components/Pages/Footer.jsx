import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';  // Social icons

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* 🔥 Top Section - Navigation & Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Contact Us</h3>
            <p className="text-gray-400">Have questions? Reach out to us:</p>
            <p className="mt-2 text-teal-400">rohitmourya632@gmail.com</p>
            <Link to="/contact" className="text-blue-400 hover:text-blue-500 transition mt-2 inline-block">
              Get in Touch
            </Link>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Follow Us</h3>
            <div className="flex gap-4">
      
              <a
                href="https://x.com/itsrohitmourya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <Twitter size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/itsrohitmourya-bb6977237/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://instagram.com/itsrohitmourya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <Instagram size={28} />
              </a>
              <a
                href="/contact"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Bottom Section - Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} WebBrick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
