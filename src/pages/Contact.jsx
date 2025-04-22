import React, { useState } from "react";
import Section from "../components/Section";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          toast.success('Message sent successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          // Clear form after successful submission
          setFormData({
            name: "",
            email: "",
            message: "",
          });
      }, (error) => {
          console.log(error.text);
          toast.error('Failed to send message. Please try again.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section id="contact">
      <div  className="flex flex-col items-center relative py-[2rem] justify-between gap-[2rem] lg:py-[1rem] w-full">
        <motion.div
        initial={{
          opacity: 0,
          y: 50, // Adding initial y offset for better entrance
        }}
        whileInView={{
          opacity: 1,
          y: 0, // Animate to normal position
        }}
        viewport={{
          margin: "-100px",
          once: false,
        }}
        transition={{
          duration: 0.8, // Animation duration
          delay: 0.2, // Delay before animation starts
          ease: "easeOut", // Smoother easing function
        }} className="relative">
        <div className="absolute top-[1rem] left-[4.5rem] lg:-top-4 lg:left-[8.5rem] w-30 h-30 lg:w-[24rem] bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
        <div className="absolute -top-[1.5rem] left-[5.5rem] lg:-top-4 lg:left-[8.5rem] w-30 h-30 lg:w-[24rem] bg-primary/25 rounded-full blur-3xl mix-blend-plus-lighter"></div>
          <h1 className="text-[2rem] font-semibold text-body-1 lg:text-[3.7rem] text-center">
            Contact Me
          </h1>
          <p className="text-body-2 text-[13px] lg:text-[1.2rem] text-center ">
            Feel free to reach out for collaborations, projects, or just a
            friendly chat!
          </p>
        </motion.div>

        <motion.form
                initial={{
                  opacity: 0,
                  y: 50, // Adding initial y offset for better entrance
                }}
                whileInView={{
                  opacity: 1,
                  y: 0, // Animate to normal position
                }}
                viewport={{
                  margin: "-100px",
                  once: false,
                }}
                transition={{
                  duration: 0.8, // Animation duration
                  delay: 0.2, // Delay before animation starts
                  ease: "easeOut", // Smoother easing function
                }} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 border-2 px-[1rem] py-[1rem] rounded-2xl border-primary">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 outline-0"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700  outline-0"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700  outline-0"
              placeholder="Your message here..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </motion.form>

      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </Section>
  );
};

export default Contact;
