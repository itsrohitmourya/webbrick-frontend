import React from "react";
import { Link } from "react-router-dom";
import { Layout, Code, Rocket, Layers, Globe, BarChart3, CheckCircle } from "lucide-react";  // Icons for better visuals

const About = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">

      {/* ✅ Hero Section */}
      <section className="relative h-96 flex flex-col justify-center items-center text-center px-6 md:px-16 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">About WebBrick</h1>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          **WebBrick** is a modern SaaS website builder designed to help you create professional web applications effortlessly, without writing a single line of code.
        </p>
        <div className="mt-6">
          <Link to="/dashboard">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105">
              Start Building
            </button>
          </Link>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="py-20 px-6 md:px-16 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-12">

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105">
              <Layout size={50} className="text-green-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4  text-center">Drag & Drop Builder</h3>
              <p className="text-gray-300 mt-2 text-center">
                Create websites visually with an intuitive drag-and-drop editor.
              </p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105">
              <Code size={50} className="text-blue-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4 text-center">Custom Components</h3>
              <p className="text-gray-300 mt-2 text-center">
                Use pre-designed sections and components with ease.
              </p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-md transition transform hover:scale-105">
              <Rocket size={50} className="text-purple-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4 text-center">Instant Deployment</h3>
              <p className="text-gray-300 mt-2 text-center">
                Export your project and deploy it with one-click hosting.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ✅ Benefits Section */}
      <section className="py-20 px-6 md:px-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-12">Why Choose WebBrick?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <Layers size={50} className="text-yellow-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Effortless Site Management</h3>
              <p className="text-gray-300 mt-2 text-center">
                Easily manage your site projects, drafts, and exports.
              </p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <BarChart3 size={50} className="text-green-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">Optimized Performance</h3>
              <p className="text-gray-300 mt-2 text-center">
                Fast loading speeds and optimized performance for all devices.
              </p>
            </div>

            <div className="p-8 bg-zinc-700 rounded-lg shadow-lg transition transform hover:scale-105">
              <CheckCircle size={50} className="text-blue-400 mx-auto" />
              <h3 className="text-2xl font-semibold mt-4">User-Friendly Interface</h3>
              <p className="text-gray-300 mt-2 text-center">
                Clean and simple design, perfect for beginners and pros alike.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-24 text-center bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg">
        <h2 className="text-5xl font-bold text-white mb-6">Get Started with WebBrick</h2>
        <p className="text-xl px-1 text-gray-300 max-w-2xl mx-auto">
          Start building and publishing your website today with WebBrick's no-code editor.
        </p>
        
        <div className="mt-8">
          <Link to="/dashboard">
            <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition transform hover:scale-105">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
