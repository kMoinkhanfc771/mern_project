import React from 'react';
import bgImage from "../assets/heroimg.jpg";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-[#f9f5f0] min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[330px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">
            <span className="hover:text-gray-600 cursor-pointer">Home</span>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold">Contact</span>
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our products or services? We're here to help!
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-4 rounded-full">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">+94 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-4 rounded-full">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@furniro.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-4 rounded-full">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Furniture Street, Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Send Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] mt-16 bg-gray-200">
        {/* Map will be added later */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Map Section (Coming Soon)
        </div>
      </div>
    </div>
  );
};

export default Contact;
