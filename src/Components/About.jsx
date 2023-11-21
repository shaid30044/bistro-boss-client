import img from "../assets/home/chef-service.jpg";

const About = () => {
  return (
    <div className="relative px-4 md:px-10 lg:px-60">
      <img src={img} className="h-40 md:h-auto" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 text-dark1 w-3/4 lg:w-3/5 px-4 md:px-8 lg:px-20 py-2 md:py-5 lg:py-12">
        <h1 className="text-lg md:text-2xl lg:text-5xl font-cinzel text-center pb-2 md:pb-4">
          BISTRO BOSS
        </h1>
        <p className="font-inter text-center text-xs md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, libero accusamus laborum deserunt ratione dolor
          officiis praesentium!{" "}
          <span className="hidden md:block">
            Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus
            incidunt quibusdam nemo.
          </span>
        </p>
      </div>
    </div>
  );
};

export default About;
