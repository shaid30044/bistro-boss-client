import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="font-inter text-lg font-medium text-white bg-dark1">
      <div className="grid lg:grid-cols-2">
        {/* contact us */}

        <div className="flex flex-col lg:items-end bg-black2 px-4 md:px-40  py-24">
          <div className="text-center">
            <h1 className="text-3xl pb-6">Contact US</h1>
            <div className="space-y-2">
              <p>123 ABS Street, Uni 21 Bangladesh</p>
              <p>+88 123456789</p>
              <p>Mon - Fri: 08:00 - 22:00</p>
              <p>Sat - Sun: 10:00 - 23:00</p>
            </div>
          </div>
        </div>

        {/* follow us */}

        <div className="flex flex-col lg:items-start bg-black1 px-4 md:px-40  py-24">
          <div className="text-center">
            <h1 className="text-3xl pb-6">Follow US</h1>
            <div className="space-y-2">
              <p>Join us on social media</p>
              <div className="flex justify-center gap-8 pt-8">
                <Link className="text-2xl">
                  <FaFacebookF />
                </Link>
                <Link className="text-2xl">
                  <FaInstagram />
                </Link>
                <Link className="text-2xl">
                  <FaTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* copyright */}

      <div className="text-base text-center py-2">
        <p>Copyright © CulinaryCloud. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
