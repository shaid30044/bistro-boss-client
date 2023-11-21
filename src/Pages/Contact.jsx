import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ContactBanner from "../Components/ContactBanner";
import VisitUs from "../Components/VisitUs";
import ContactForm from "../Components/ContactForm";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Contact Us</title>
      </Helmet>
      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
      <ContactBanner />
      <VisitUs />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
