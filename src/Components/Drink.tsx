import { useEffect, useState } from "react";
import api from "../services/api";
import { ReactTyped } from "react-typed";

interface Drink {
  _id: number;
  name: string;
  img_url: string;
  description: string;
  price: string;
}
function Drink() {
  const [drink, setDrink] = useState<Drink[]>([]);
  useEffect(() => {
    const fetchDrink = async () => {
      const response = await api.get("/drink");
      setDrink(response.data);
    };
    fetchDrink();
  }, []);
  return (
    <>
      <div className="pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <h1 className="text-3xl  sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6 leading-tight text-center">
          <ReactTyped
            strings={[
              "Refresh with our drinks.",
              "Enjoy a cool, refreshing beverage",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </h1>
        {drink.map((item) => (
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

export default Drink;
