import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SalesLineGraph = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the existing chart instance
      }

      const labels = data.map(item => item.month);
      const values = data.map(item => item.sales);

      const ctx = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sales',
            data: values,
            borderColor: 'rgba(255, 99, 132, 0.8)', // Red color with transparency
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red color with transparency
            borderWidth: 2,
            pointRadius: 6, // Larger point radius for better visibility
            pointHoverRadius: 8 // Increase hover radius for better interactivity
          }]
        },
        options: {
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Allow aspect ratio to be determined by container size
            scales: {
              x: {
                grid: {
                  display: false // Remove x-axis grid lines
                }
              },
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                },
                grid: {
                  display: false // Remove y-axis grid lines
                }
              }
            },
            plugins: {
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Custom background color for tooltip
                displayColors: false, // Hide color box in tooltip
                padding: 10, // Add padding to tooltip content
                callbacks: {
                  label: function(context) {
                    return `Sales: $${context.parsed.y}`; // Customize tooltip label
                  }
                }
              }
            },
            animation: {
              duration: 1000, // Smooth animation duration
              easing: 'easeInOutQuart' // Easing function for animation
            }
          }
          
      });
    }
  }, [data]);

  return (
    <div style={{ width: '100%', height: '200px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default SalesLineGraph;