import { useEffect, useState } from "react";
import api from "../services/api";
import { ReactTyped } from "react-typed";

interface Dinner {
  _id: number;
  name: string;
  img_url: string;
  description: string;
  price: string;
}
function Dinner() {
  const [dinner, setDinner] = useState<Dinner[]>([]);
  useEffect(() => {
    const fetchDinner = async () => {
      const response = await api.get("/dinner");
      setDinner(response.data);
    };
    fetchDinner();
  }, []);
  return (
    <>
      <div className="pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <h1 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6 leading-tight text-center">
          <ReactTyped
            strings={[
              "End your day with a delightful dinner experience.",
              "Enjoy a hearty and satisfying dinner.",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </h1>
        {dinner.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={item.img_url}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 ">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="badge badge-accent text-xl p-4 badge-outline ">
                ETB {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dinner;
