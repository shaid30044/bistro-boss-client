import OrderTabItem from "./OrderTabItem";

const OrderTab = ({ type }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 pt-10">
      {type.map((item) => (
        <OrderTabItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OrderTab;
