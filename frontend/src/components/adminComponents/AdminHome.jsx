import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminHome.css";

function AdminHome() {
    const [showUploadSection, setShowUploadSection] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false); // New state for Add Category form
    const [showEditCategoryForm, setShowEditCategoryForm] = useState(false); // New state for Edit Category form
    const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]); // Sample categories
    const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
    const [newCategoryName, setNewCategoryName] = useState(""); // Category name to update
    const uploadSectionRef = useRef(null);
    const navigate = useNavigate(); // Initialize navigate

    // Scroll to the bottom section after it's visible
    useEffect(() => {
        if (showUploadSection || showAddCategoryForm || showEditCategoryForm) {
            uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [showUploadSection, showAddCategoryForm, showEditCategoryForm]); // This effect runs when section visibility is updated

    const handleEditCarouselClick = () => {
        setShowUploadSection(true); // Trigger visibility of the upload section
        setShowAddCategoryForm(false); // Hide the Add Category form
        setShowEditCategoryForm(false); // Hide the Edit Category form
    };

    const handleAddCategoryClick = () => {
        setShowAddCategoryForm(true); // Show the Add Category form
        setShowUploadSection(false); // Hide the carousel upload section
        setShowEditCategoryForm(false); // Hide the Edit Category form
    };

    const handleEditCategoryClick = () => {
        setShowEditCategoryForm(true); // Show the Edit Category form
        setShowAddCategoryForm(false); // Hide the Add Category form
        setShowUploadSection(false); // Hide the carousel upload section
    };

    const handelredirect = (path) => {
        navigate(path); // Redirect to the specified path
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value); // Update selected category
        setNewCategoryName(event.target.value); // Set the category name to the input field
    };

    const handleCategoryUpdate = () => {
        // Update the category in the list
        setCategories(categories.map(cat => cat === selectedCategory ? newCategoryName : cat));
        alert("Category updated successfully!");
    };

    return (
        <>
            <div className="admin-home">
                <div className="logo-section">
                    <logo />
                </div>
                <div className="content-section">
                    <div className="admin-actions">
                        <button className="button-48" onClick={handleEditCarouselClick}>
                            <span className="text">Edit Carousel Images</span>
                        </button>
                        <br />
                        <button className="button-48" onClick={() => handelredirect("/admin/add-dishes")}>
                            <span className="text">Add Dishes</span>
                        </button>
                        <br />
                        <button className="button-48" onClick={handleEditCarouselClick}>
                            <span className="text">Edit Dishes</span>
                        </button>
                        <br />
                        <button className="button-48" onClick={handleAddCategoryClick}>
                            <span className="text">Add Category</span>
                        </button>
                        <br />
                        <button className="button-48" onClick={handleEditCategoryClick}>
                            <span className="text">Edit Category</span>
                        </button>
                        <br />
                    </div>
                </div>
            </div>

            {/* New Separate Div at the Bottom */}
            <div ref={uploadSectionRef} className="upload-section">
                {showUploadSection && (
                    <>
                        <h4 style={{ marginBottom: '30px' }}>Edit Carousel Images</h4>
                        <div className="image">
                            <h6>Carousel Img 1</h6>
                            <div className="input-container">
                                <input type="file" accept="image/*" className="file-input" />
                                <button type="submit" className="upload-button">Upload</button>
                            </div>
                        </div>

                        <div className="image">
                            <h6>Carousel Img 2</h6>
                            <div className="input-container">
                                <input type="file" accept="image/*" className="file-input" />
                                <button type="submit" className="upload-button">Upload</button>
                            </div>
                        </div>

                        <div className="image">
                            <h6>Carousel Img 3</h6>
                            <div className="input-container">
                                <input type="file" accept="image/*" className="file-input" />
                                <button type="submit" className="upload-button">Upload</button>
                            </div>
                        </div>
                    </>
                )}

                {showAddCategoryForm && (
                    <>
                        <h4 style={{ marginBottom: '30px' }}>Add New Category</h4>
                        <div className="add-category-form" style={{display:'block'}}>
                            <input
                                type="text"
                                placeholder="Enter category name"
                                className="category-input"
                            /><br></br>
                            <button type="submit" className="submit-category-button">
                                Add Category
                            </button>
                        </div>
                    </>
                )}

                {showEditCategoryForm && (
                    <>
                        <h4 style={{ marginBottom: '30px' }}>Edit Existing Category</h4>
                        <div className="edit-category-form">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="category-select"
                            >
                                <option value="">Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Edit category name"
                                className="category-input"
                            />
                            <button type="button" onClick={handleCategoryUpdate} className="submit-category-button">
                                Update Category
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AdminHome;
