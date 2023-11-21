import axios from "axios";
import { useEffect, useState } from "react";

const MenuItems = ({ type }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bistro-boss-server-ten-mu.vercel.app/menu"
        );
        const data = response.data;

        const popularItems = data.filter((item) => item.category === type);
        setMenu(popularItems);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchData();
  }, [type]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {menu.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-3 md:gap-5 lg:gap-8"
        >
          <div className="w-1/5">
            <img
              src={item.image}
              style={{ borderRadius: "0 14px 0px 14px" }}
              className="w-full"
            />
          </div>
          <div className="flex gap-1 w-4/5">
            <div>
              <h1 className="md:text-xl text-dark1 font-cinzel">
                {item.name}------
              </h1>
              <p className="text-xs md:text-base">{item.recipe}</p>
            </div>
            <p className="text-sm md:text-lg text-brown1">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
