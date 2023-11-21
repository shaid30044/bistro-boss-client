import { useRef } from "react";
import SectionTitle from "./SectionTitle";
import { RiSendPlaneFill } from "react-icons/ri";

const ContactForm = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    formRef.current.reset();
  };

  return (
    <div className="font-inter px-4 md:px-10 lg:px-60 pb-20">
      <SectionTitle
        subtitle={"---Send Us a Message---"}
        title={"CONTACT FORM"}
      />

      <div className="bg-dark7 p-6 md:p-10 lg:p-20">
        <form ref={formRef}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* name */}

            <div>
              <p className="text-xl font-semibold text-dark2 pb-4">Name*</p>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="rounded-md w-full px-6 py-3"
              />
            </div>

            {/* email */}

            <div>
              <p className="text-xl font-semibold text-dark2 pb-4">Email*</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="rounded-md w-full px-6 py-3"
              />
            </div>
          </div>

          {/* phone */}

          <p className="text-xl font-semibold text-dark2 pt-6 pb-4">Phone*</p>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="rounded-md w-full px-6 py-3"
          />

          {/* message */}

          <p className="text-xl font-semibold text-dark2 pt-6 pb-4">Message*</p>
          <textarea
            name="message"
            rows="10"
            placeholder="Write your message here"
            className="rounded-md w-full px-6 py-3"
          />
        </form>

        {/* send */}

        <button
          onClick={handleSubmit}
          className="flex btn normal-case text-xl font-semibold text-white rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] px-6 m-auto mt-20 lg:mt-40"
        >
          Send Message
          <RiSendPlaneFill />
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
