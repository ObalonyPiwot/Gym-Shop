import React, { useEffect, useState } from 'react';

function Sidebar(props) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/selectCategories');
        const data = await response.json();
        const categories = data.Kategorie;
        setCategoryList(categories);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    props.setCat(categoryId);
  };

  return (
    <div className="sidebar">
      {categoryList.map((category) => (
        <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
          {category.nazwa}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
