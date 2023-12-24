import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
    }
    //TODO : implement after writing backend for this contact us page
    // try {
    //   const response = await axios.post("/api/v1/contact", userInput);
    //   if (response.data.success) {
    //     toast.success("Form Submitted Successfully");
    //     setUserInput({
    //       name: "",
    //       email: "",
    //       message: "",
    //     });
    //   } else {
    //     toast.error("Problem in sending Email to us");
    //   }
    // } catch (error) {
    //   toast.error(error);
    // }

    // *checking 
    // setUserInput({
    //     name: "",
    //     email: "",
    //     message: "",
    // });
    // console.log(userInput);
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
