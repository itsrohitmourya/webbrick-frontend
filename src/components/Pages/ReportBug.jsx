import React, { useState } from "react";
import { Send, UploadCloud, CheckCircle, XCircle, Loader } from "lucide-react";  

const ReportBug = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(false);

  // ✅ Handle File Selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://webbrick-backend.onrender.com/api/send-mail", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setToastMessage(result.message || "Bug reported successfully! ✅");
        setToastError(false);
        e.target.reset();
        setFile(null);
      } else {
        setToastMessage(result.message || "Failed to submit bug report. ❌");
        setToastError(true);
      }

    } catch (error) {
      console.error("❌ Error:", error);
      setToastMessage("An error occurred. Please try again.");
      setToastError(true);
    } finally {
      setShowToast(true);
      setLoading(false);

      // Auto-hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-6 py-12 relative">

      {/* ✅ Toast Notification */}
      {showToast && (
        <div id="formToast" className={`absolute bottom-28 left-5 z-50 px-6 py-4 rounded-lg shadow-lg text-white 
                        ${toastError ? "bg-red-600" : "bg-green-600"} transition-transform animate-slide-in`}>
          <div className="flex items-center gap-2">
            {toastError ? <XCircle size={20} /> : <CheckCircle size={20} />}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl bg-zinc-800 p-8 rounded-lg shadow-lg">
        
        {/* ✅ Header */}
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Report a Bug</h1>
        <p className="text-gray-400 mb-8">
          Help us improve WebBrick by reporting any issues you encounter.
        </p>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Your Name</label>
            <input
              type="text"
              name="name"     // ✅ Field name matches backend
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Your Email</label>
            <input
              type="email"
              name="email"    // ✅ Field name matches backend
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Bug Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Bug Description</label>
            <textarea
              name="message"    // ✅ Field name matches backend
              placeholder="Describe the bug you encountered..."
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 h-32"
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Attach Screenshot (Optional)</label>
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 transition">
              <label className="flex items-center gap-2 cursor-pointer">
                <UploadCloud size={20} />
                <span>{file ? file.name : "Choose File"}</span>
                <input
                  type="file"
                  name="screenshot"   // ✅ Use the same name as backend
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <button
                  onClick={() => setFile(null)}
                  type="button"
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-3 
                          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-400"} 
                          text-white font-semibold rounded-lg transition transform active:scale-75`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" size={20} />
                  Sending...
                </div>
              ) : (
                <>
                  <Send size={20} />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportBug;
