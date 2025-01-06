import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './CategoryList.css';

// chart.js setting
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // category list
  const categories = [
    { name: 'Exercise', icon: '🏋️‍♀️' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Food', icon: '🍔' }
  ];

  // mock data
  const categoryData = {
    Exercise: [5, 10, 3, 7, 4, 6, 9, 2, 8, 10, 5, 3], 
    Shopping: [2, 3, 5, 1, 2, 7, 4, 6, 3, 5, 8, 2], 
    Food: [12, 15, 13, 14, 16, 13, 17, 19, 20, 18, 17, 16] 
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
  };

  const chartData = selectedCategory ? {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // 월별 레이블
    datasets: [
      {
        label: selectedCategory, // category name
        data: categoryData[selectedCategory], // data of the selected category
        borderColor: '#F25288', // graph color
        backgroundColor: '#F25288', // graph background color
        fill: true 
      }
    ]
  } : null;

  return (
    <div className="category-container">
      <div className="category-each-total">
        <div className="category-area">
          <div className="category-header">
            <h2>Category</h2>
          </div>
        </div>
      </div>

      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-item"
            onClick={() => handleCategoryClick(category.name)} // changed category
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>

      {/* the graph is displayed according to the selected category */}
      {selectedCategory && chartData && (
        <div className="chart-container">
          <h3>{selectedCategory} Monthly Activity</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
