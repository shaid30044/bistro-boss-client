import { Link } from "react-router-dom";
import img from "../assets/404.gif";
import { AiFillHome } from "react-icons/ai";
import Loading from "../Components/Loading";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <img src={img} />

      {/* back to home */}

      <Link to="/">
        <button className="flex btn normal-case text-xl font-semibold text-white rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] px-6 m-auto mt-10">
          Back To Home
          <AiFillHome />
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
