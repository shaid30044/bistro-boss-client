import SectionTitle from "./SectionTitle";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoTime } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";

const VisitUs = () => {
  const locations = [
    {
      title: "phone",
      p1: "+38 (012) 34 56 789",
      p2: "",
      icon: BiSolidPhoneCall,
    },
    {
      title: "address",
      p1: "+38 (012) 34 56 789",
      p2: "",
      icon: TiLocation,
    },
    {
      title: "working hours",
      p1: "Mon - Fri: 08:00 - 22:00",
      p2: "Sat - Sun: 10:00 - 23:00",
      icon: IoTime,
    },
  ];

  return (
    <div className="font-inter px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle subtitle={"---Visit Us---"} title={"OUR LOCATION"} />

      <div className="grid lg:grid-cols-3 gap-6">
        {locations.map((location, idx) => (
          <div key={idx}>
            <div className="flex justify-center text-3xl text-white bg-brown4 py-4">
              {<location.icon />}
            </div>
            <div className="border-x border-b border-dark6">
              <div className="text-dark2 text-center bg-dark7 h-40 mx-6 mb-6 pt-8">
                <h3 className="text-xl font-semibold text-dark1 uppercase pb-4">
                  {location.title}
                </h3>
                <p>{location.p1}</p>
                <p>{location.p2}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitUs;
