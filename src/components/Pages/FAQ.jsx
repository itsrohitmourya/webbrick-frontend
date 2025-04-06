import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone } from "lucide-react"; // Icons for better UX

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is WebBrick?",
      answer: "WebBrick is a SaaS website builder that allows you to create and manage professional-grade websites without coding, using drag-and-drop components."
    },
    {
      question: "Do I need to know how to code to use WebBrick?",
      answer: "No, WebBrick is designed for both developers and non-developers. You can create fully functional websites using its drag-and-drop interface."
    },
    {
      question: "Can I export my website after building it?",
      answer: "Yes, WebBrick allows you to export the complete website code, including HTML, CSS, and JavaScript, for deployment on any platform."
    },
    {
      question: "Is WebBrick free to use?",
      answer: "WebBrick offers a free plan with limited features. You can upgrade to premium plans for access to advanced features and additional export options."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team by email at support@webbrick.com or call us at +1 (555) 123-4567."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-16 px-6 md:px-16">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-400">Frequently Asked Questions</h1>
        <p className="text-gray-400 mt-2">
          Find answers to the most common questions about WebBrick.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg mb-6 shadow-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-gray-700 transition"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={24} className="text-blue-400" />
              ) : (
                <ChevronDown size={24} className="text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-700 text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="mt-16 bg-gray-800 rounded-lg p-10 shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-400 mb-6">Need More Help?</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="flex items-center gap-4">
            <Mail size={36} className="text-blue-400" />
            <div>
              <h3 className="text-lg font-bold">Email Support</h3>
              <p className="text-gray-400">support@webbrick.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone size={36} className="text-green-400" />
            <div>
              <h3 className="text-lg font-bold">Phone Support</h3>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Help Center */}
          <div className="flex items-center gap-4">
            <HelpCircle size={36} className="text-yellow-400" />
            <div>
              <h3 className="text-lg font-bold">Help Center</h3>
              <p className="text-gray-400">Visit our Help Center for detailed documentation and guides.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
