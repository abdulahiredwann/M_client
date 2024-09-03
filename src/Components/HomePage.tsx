// src/components/HomePage.js
import breakfastImg from "../../public/breakfast.jpg";
import lunchImg from "../../public/lunch.jpg";
import drinkImg from "../../public/drink.jpg";
import dinnerImg from "../../public/dinner.jpg";
import breakicon from "../../public/breakfast.png";
import lunchicon from "../../public/fried-rice.png";
import dinnerIcon from "../../public/dinner.png";
import drinkIcon from "../../public/drink.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="pt-20 p-4">
      {" "}
      {/* Added pt-16 to give space below fixed navbar */}
      {/* Menu Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Breakfast */}
        <div
          className="relative bg-cover bg-center rounded-lg shadow-md flex items-center justify-center h-64"
          style={{ backgroundImage: `url(${breakfastImg})` }}
        >
          <button
            onClick={() => navigate("/breakfast")}
            className="absolute bottom-4 bg-white font-serif text-black py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <span>Breakfast</span>
            <img src={breakicon} className="w-9 h-9" alt="Breakfast Icon" />
          </button>
        </div>

        {/* Lunch */}
        <div
          className="relative bg-cover bg-center rounded-lg shadow-md flex items-center justify-center h-64"
          style={{ backgroundImage: `url(${lunchImg})` }}
        >
          <button
            onClick={() => navigate("/lunch")}
            className="absolute bottom-4 bg-white font-serif text-black py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <span>Lunch</span>
            <img src={lunchicon} className="w-9 h-9" alt="Lunch Icon" />
          </button>
        </div>

        {/* Dinner */}
        <div
          className="relative bg-cover bg-center rounded-lg shadow-md flex items-center justify-center h-64"
          style={{ backgroundImage: `url(${dinnerImg})` }}
        >
          <button
            onClick={() => navigate("/dinner")}
            className="absolute bottom-4 bg-white font-serif text-black py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <span>Dinner</span>
            <img src={dinnerIcon} className="w-9 h-9" alt="Dinner Icon" />
          </button>
        </div>

        {/* Drink */}
        <div
          className="relative bg-cover bg-center rounded-lg shadow-md flex items-center justify-center h-64"
          style={{ backgroundImage: `url(${drinkImg})` }}
        >
          <button
            onClick={() => navigate("/drink")}
            className="absolute bottom-4 bg-white font-serif text-black py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2"
          >
            <span>Drink</span>
            <img src={drinkIcon} className="w-9 h-9" alt="Drink Icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
