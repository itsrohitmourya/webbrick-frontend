import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, XCircle, Loader } from "lucide-react";

const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("https://webbrick-backend.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setToastMessage(result.message || "Message sent successfully! ✅");
        setToastError(false);
        e.target.reset();
      } else {
        setToastMessage(result.message || "Failed to send message. ❌");
        setToastError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("An error occurred. Please try again.");
      setToastError(true);
    } finally {
      setShowToast(true);
      setLoading(false);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen relative">

      {showToast && (
        <div className={`absolute bottom-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white 
                         ${toastError ? "bg-red-600" : "bg-green-600"} transition-transform animate-slide-in`}>
          <div className="flex items-center gap-2">
            {toastError ? <XCircle size={20} /> : <CheckCircle size={20} />}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <section className="relative h-96 flex flex-col justify-center items-center text-center px-6 md:px-16 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          Have questions, feedback, or need support? Fill out the form below or reach us through social channels.
        </p>
      </section>

      <section className="py-16 px-6 md:px-16 bg-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* 🔥 Form */}
          <div className="bg-zinc-700 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-400 mb-6">Contact Us</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 text-sm font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-md my-2 bg-zinc-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400 transition"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-md bg-zinc-800 text-white my-2 border border-gray-600 focus:outline-none focus:border-blue-400 transition"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold">Message</label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 my-2 rounded-md overflow-hidden bg-zinc-800 text-white border border-gray-600 focus:outline-none focus:border-blue-400 transition h-40"
                  placeholder="Your Message"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                text-white font-semibold rounded-lg transition transform active:scale-75`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Loader className="animate-spin mr-2" size={20} /> Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* 🔥 Contact Info */}
          <div className="flex flex-col justify-center items-center bg-zinc-700 p-8 rounded-lg shadow-lg text-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center gap-2">
                  <Mail size={26} className="text-blue-400" />
                  <h3 className="text-lg font-semibold">Email</h3>
                </div>
                <p className="text-gray-300">support@webbrick.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center gap-2">
                  <Phone size={26} className="text-green-400" />
                  <h3 className="text-lg font-semibold">Phone</h3>
                </div>
                <p className="text-gray-300">+1 (123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={28} className="text-yellow-400" />
                  <h3 className="text-lg font-semibold">Address</h3>
                </div>
                <p className="text-gray-300">123 WebBrick Lane, Tech City, USA</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
