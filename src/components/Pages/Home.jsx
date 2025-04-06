import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Layout,
  Code,
  Rocket,
  Cpu,
  Database,
  Layers,
  Terminal,
  Cloud,
  Shield
} from "lucide-react";  // Icons for visual appeal

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ✅ Text animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-zinc-900 text-white min-h-screen">

      {/* ✅ Hero Section with Text Animation */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className={`text-2xl my-4 font-bold text-blue-400 hover:text-blue-500 flex flex-col flex-wrap justify-center items-center gap-2 transition ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <img
            src="/icon2.png"
            alt="logo"
            className='h-auto w-14 sm:w-14 md:w-14 lg:w-14'
          />
          <span className='text-5xl sm:text-6xl md:text-6xl lg:text-6xl bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent font-extrabold font-[Poppins] mt-[4px]'>
            WebBrick
          </span>
        </div>
        <h1
          className={`text-4xl font-bold text-blue-400 mb-6 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          Build Static Websites Effortlessly
        </h1>

        <p
          className={`text-xl text-gray-300 max-w-3xl leading-relaxed transition-opacity duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          Create stunning, professional websites with drag-and-drop simplicity.
          No coding required, just creativity.
        </p>

        <div className="flex justify-center items-center gap-x-4 gap-y-4 w-full h-auto flex-wrap mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="h-16 w-36 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            Get Started
          </button>

          {/* ✅ Show Sign Up only if not authenticated */}
          {!isAuthenticated && (
            <button
              onClick={() => navigate("/register")}
              className="w-36 h-16 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Sign Up
            </button>
          )}
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-20 px-6 md:px-16 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-400 mb-12">Why Choose WebBrick?</h2>

          <div className="grid md:grid-cols-3 gap-12">

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105 text-center">
              <Layout size={50} className="text-blue-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Drag & Drop Builder</h3>
              <p className="text-gray-300 mt-2">Build websites with an intuitive visual editor.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105 text-center">
              <Code size={50} className="text-green-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4 ">Pre-built Components</h3>
              <p className="text-gray-300 mt-2">Use pre-built and customizable sections.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105 text-center">
              <Rocket size={50} className="text-purple-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Fast Deployment</h3>
              <p className="text-gray-300 mt-2">One-click export & deploy on Vercel or Render.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ✅ Tech Stack Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-12">Tech Stack</h2>

          <div className="grid md:grid-cols-3 gap-12">

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Terminal size={50} className="text-yellow-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Node.js</h3>
              <p className="text-gray-300 mt-2">Efficient and scalable server-side applications.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Database size={50} className="text-green-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">MongoDB</h3>
              <p className="text-gray-300 mt-2">Flexible and scalable NoSQL database.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Cpu size={50} className="text-blue-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">React.js</h3>
              <p className="text-gray-300 mt-2">Dynamic and interactive user interfaces.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Layers size={50} className="text-pink-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Redux</h3>
              <p className="text-gray-300 mt-2">State management for scalable apps.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Cloud size={50} className="text-purple-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Vercel</h3>
              <p className="text-gray-300 mt-2">Seamless deployment and hosting.</p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Shield size={50} className="text-red-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">JWT Auth</h3>
              <p className="text-gray-300 mt-2">Secure authentication with JWT.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-24 gradient-animation text-center shadow-lg">
        <h2 className="text-5xl font-bold text-white mb-6">Start Building with WebBrick</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join the next generation of web developers.</p>
      </section>

    </div>
  );
};

export default Home;
