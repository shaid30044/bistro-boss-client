import { Link } from "react-router-dom";

const Button = ({ name, path }) => {
  return (
    <div className="flex justify-center mt-8 lg:mt-12">
      <Link to={path}>
        <button className="btn md:text-lg font-medium bg-transparent hover:bg-transparent border-0 border-b-2 border-black2 hover:border-black2">
          {name}
        </button>
      </Link>
    </div>
  );
};

export default Button;
