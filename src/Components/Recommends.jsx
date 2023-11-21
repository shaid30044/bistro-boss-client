import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import axios from "axios";

const Recommends = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bistro-boss-server-ten-mu.vercel.app/menu"
        );
        const data = response.data;
        setMenu(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-inter px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle subtitle={"---Should Try---"} title={"CHEF RECOMMENDS"} />
      <div className="grid lg:grid-cols-3 gap-6">
        {menu.slice(6, 9).map((menu) => (
          <div key={menu._id} className="flex flex-col md:flex-row lg:flex-col">
            <img src={menu.image} />

            <div className="text-center text-dark1 bg-dark7 lg:h-[268px] p-8">
              <h3 className="text-xl font-semibold">{menu.name}</h3>
              <p className="pt-2 pb-6">{menu.recipe}</p>
              <button className="btn text-lg font-medium text-brown2 bg-dark6 hover:bg-black2 border-0 border-b-2 border-brown1 duration-300 px-6">
                add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommends;
