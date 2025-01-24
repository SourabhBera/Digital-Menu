import React, { useState, useEffect } from "react";
import ImageModal from "./ImageModal";
import "./MenuSection.css";
import foodimg1 from '../assets/images/foodimg1.jpg';
import momos from '../assets/images/momos.jpg';

const Foodimage1 = foodimg1;


function MenuSection() {
  const [menuItems, setMenuItems] = useState({
    starters: [],
    soups: [],
    mainCourse: [],
  });

  useEffect(() => {
   
    setMenuItems({
      starters: [
        { name: "Fried Momos", price:220, image:momos },
        { name: "Spring Rolls", price:200, image:Foodimage1 },
        { name: "Bruschetta", price:250, image:Foodimage1 },
      ],
      soups: [
        { name: "Tomato Soup", price:150,image:Foodimage1 },
        { name: "Chicken Soup", price:180, image: Foodimage1 },
      ],
      mainCourse: [
        { name: "Grilled Chicken", price:550, image: Foodimage1 },
        { name: "Pasta Primavera", price:620, image:Foodimage1 },
      ],
    });
  }, []);

  return (
    <div className="menu-section">
      {["starters", "soups", "mainCourse"].map((category, categoryIndex) => (
        <div key={category} className="category">
          <button 
            className="btn btn-primary" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target={`#collapse-${categoryIndex}`} 
            aria-expanded="false" 
            aria-controls={`collapse-${categoryIndex}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
          <div 
            className="menu-items collapse" 
            id={`collapse-${categoryIndex}`}
          >
            {menuItems[category].map((item, index) => (
              <div className="menu-item" key={index}>
                <ImageModal imageSrc={item.image} dishName={item.name} price={item.price} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuSection;





{/* <div className="menu-section">
      {["starters", "soups", "mainCourse"].map((category) => (
        <div key={category} className="category">
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div className="menu-items">
            {menuItems[category].map((item, index) => (
              <div className="menu-item" key={index}>
                <ImageModal imageSrc={item.image} dishName={item.name} price={item.price} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div> */}