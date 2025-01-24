import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddDishes.css";

function AddDishes() {
  const navigate = useNavigate();

  const [dishName, setDishName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Veg");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dishName || !category || !price || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const newDish = {
      dishName,
      category,
      type,
      price,
      image,
    };

    console.log("New Dish:", newDish);

    // Clear form
    setDishName("");
    setCategory("");
    setType("Veg");
    setPrice("");
    setImage(null);

    alert("Dish added successfully!");
    navigate("/"); // Redirect to home
  };

  return (
    <div className="add-dish-form">
      <h2>Add New Dish</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dishName">Dish Name:</label>
          <input
            type="text"
            id="dishName"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Enter dish name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Drinks">Drinks</option>
            <option value="Soups">Soups</option>
            <option value="Bar Muchies">Bar Muchies</option>
            <option value="Starters">Starters</option>
            <option value="Main-Course">Main-Course</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type:</label>
          <select
            className="form-select"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {image && <p>Selected file: {image.name}</p>}
        </div>

        <button type="submit" className="submit-button">
          Add Dish
        </button>
      </form>
    </div>
  );
}

export default AddDishes;
