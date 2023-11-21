import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import useMenu from "../Hooks/useMenu";

const ShopItems = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const desserts = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div className="px-4 md:px-10 lg:px-60 py-20">
      <div className="text-xs md:text-base font-medium text-dark1 text-center pb-10">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>SALAD</Tab>
            <Tab>PIZZA</Tab>
            <Tab>SOUPS</Tab>
            <Tab>DESSERTS</Tab>
            <Tab>DRINKS</Tab>
          </TabList>
          <TabPanel>
            <OrderTab type={salad} />
          </TabPanel>
          <TabPanel>
            <OrderTab type={pizza} />
          </TabPanel>
          <TabPanel>
            <OrderTab type={soup} />
          </TabPanel>
          <TabPanel>
            <OrderTab type={desserts} />
          </TabPanel>
          <TabPanel>
            <OrderTab type={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ShopItems;
