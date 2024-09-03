import { useEffect, useState } from "react";
import api from "../services/api";

interface Lunch {
  _id: number;
  name: string;
  img_url: string;
  description: string;
  price: string;
}
function Lunch() {
  const [lunch, setLunch] = useState<Lunch[]>([]);
  useEffect(() => {
    const fetchLunch = async () => {
      const response = await api.get("/lunch");
      setLunch(response.data);
    };
    fetchLunch();
  }, []);
  return (
    <>
      <div className="pt-20 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {lunch.map((item) => (
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

export default Lunch;
