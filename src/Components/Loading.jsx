import img from "../assets/others/cupcake.gif";

const Loading = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={img} />

      <h1 className="text-5xl font-bold font-cinzel text-center leading-[60px]">
        Welcome to Bistro Boss
        <br />
        Restaurant
      </h1>
    </div>
  );
};

export default Loading;
