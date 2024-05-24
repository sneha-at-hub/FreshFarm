import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TopFarmersBarChart = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the existing chart instance
      }

      const labels = data.map(farmer => farmer.name);
      const values = data.map(farmer => farmer.sales);

      const ctx = chartRef.current.getContext('2d');

      // Generate shades of green for background colors
      const backgroundColors = generateShadesOfGreen(data.length);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sales',
            data: values,
            backgroundColor: backgroundColors,
            borderColor: '#4CAF50', // Darker green for borders
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuad'
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                font: {
                  size: 12
                }
              },
              grid: {
                display: false // Remove x-axis grid lines
              }
            },
            y: {
              ticks: {
                font: {
                  size: 12
                }
              },
              grid: {
                display: false // Remove y-axis grid lines
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    }
  }, [data]);

  // Function to generate shades of green
  const generateShadesOfGreen = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const shade = i * (255 / count); // Adjust the shade based on the count
      colors.push(`rgba(0, ${shade}, 0, 0.7)`); // Adjust the alpha for transparency
    }
    return colors;
  };

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TopFarmersBarChart;