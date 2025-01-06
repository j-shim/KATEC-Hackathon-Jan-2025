import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './CategoryList.css';
import api from '../../utils/api';

// chart.js 
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  
  const categories = [
    { name: 'productive', icon: '💼' },
    { name: 'essential', icon: '🛍️' },
    { name: 'leisure', icon: '🌴' },
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((prevCategory) => (prevCategory === categoryName ? null : categoryName));
  };

  const chartData = selectedCategory && categoryData ? {
    labels: categoryData.dates, 
    datasets: [
      {
        label: `${selectedCategory} - Completed`,
        data: categoryData.completedCounts, // completed
        borderColor: '#28a745',
        backgroundColor: 'rgb(60, 193, 25)',
        fill: true,
      },
      {
        label: `${selectedCategory} - Pending`,
        data: categoryData.pendingCounts, // pending
        borderColor: '#dc3545',
        backgroundColor: '#EF476F',
        fill: true,
      },
    ],
  } : null;

  useEffect(() => {
    const getCategoryData = async () => {
      if (!selectedCategory) return;

      try {
        const response = await api.get('/tasks', {
          params: { category: selectedCategory },
        });

        const tasks = response.data;

        const dates = Array.from(new Set(tasks.map((task) => task.date))); 
        const completedCounts = dates.map(date => tasks.filter((task) => task.date === date && task.isDone).length);
        const pendingCounts = dates.map(date => tasks.filter((task) => task.date === date && !task.isDone).length);

        setCategoryData({
          dates, 
          completedCounts, 
          pendingCounts, 
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    getCategoryData();
  }, [selectedCategory]);

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
            onClick={() => handleCategoryClick(category.name)} 
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>

      {selectedCategory && chartData && (
        <div className="chart-container">
          <h3>{selectedCategory} Activity</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
};

export default CategoryList;
