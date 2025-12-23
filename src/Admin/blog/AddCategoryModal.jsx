import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './AddCategoryModal.css';
import { useBlogContext } from "../../context/BlogContext";

const AddCategoryModal = ({ onClose, onSuccess }) => {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory,fetchCategories } = useBlogContext(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      toast.error('Category name is required');
      return;
    }

    try {
      await addCategory(trimmedName); 
      toast.success('Category added!');
      setCategoryName('');
      onClose();
      onSuccess();
    } catch (err) {
      toast.error('Error adding category: ' + err.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
