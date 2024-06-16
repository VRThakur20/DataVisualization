import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

// BarGraph component to render a bar graph using D3
const BarGraph = () => {
  // State to hold the JSON data fetched from the API
  const [jsonData, setJsonData] = useState(null);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get('http://localhost:3000/fetchData');
        setJsonData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      } finally {
        setLoading(false); // Set loading to false after data fetch is complete
      }
    };

    fetchData();
  }, []);

  // Reference to the SVG element
  const svgRef = useRef();

  // useEffect to render the bar graph whenever jsonData changes
  useEffect(() => {
    if (jsonData) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 30, right: 30, bottom: 40, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Set the dimensions of the SVG
      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      // Append a group element to the SVG and set its transform attribute
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Extract unique quarters from the data
      const quarters = Array.from(new Set(jsonData.map(d => d.closed_fiscal_quarter)));
      // Define the x-axis scale
      const x = d3.scaleBand().domain(quarters).range([0, width]).padding(0.2);

      // Append x-axis to the group element
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Find the maximum ACV value for y-axis scaling
      const maxY = d3.max(jsonData, d => d.acv);
      // Define the y-axis scale
      const y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

      // Append y-axis to the group element
      g.append('g').call(d3.axisLeft(y));

      // Iterate over each quarter to create bars
      quarters.forEach(quarter => {
        // Filter data for the current quarter
        const quarterData = jsonData.filter(d => d.closed_fiscal_quarter === quarter);
        const totalACV = d3.sum(quarterData, d => d.acv); // Calculate total ACV for the quarter
        const totalCount = d3.sum(quarterData, d => d.count); // Calculate total count for the quarter

        let offsetY = 0; // Initialize offset for stacking bars
        quarterData.forEach(d => {
          // Calculate the height of each bar
          const barHeight = height - y(d.acv);
          // Calculate the percentage for the current bar
          const percentage = ((d.count / totalCount) * 100).toFixed(2);

          // Append a rect element for the bar
          g.append('rect')
            .attr('x', x(quarter))
            .attr('y', y(d.acv) - offsetY)
            .attr('width', x.bandwidth())
            .attr('height', barHeight)
            .attr('fill', d.Cust_Type === 'Existing Customer' ? 'blue' : 'orange'); // Set color based on customer type

          // Append text to display the percentage inside the bar
          g.append('text')
            .attr('x', x(quarter) + x.bandwidth() / 2)
            .attr('y', y(d.acv) - offsetY + barHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(`${percentage}%`);

          offsetY += barHeight; // Update offset for the next bar
        });

        // Append text to display the total ACV above the bars
        g.append('text')
          .attr('x', x(quarter) + x.bandwidth() / 2)
          .attr('y', y(totalACV) - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', 'black')
          .text(totalACV.toFixed(2));
      });
    }
  }, [jsonData]); // Dependency array to trigger the effect when jsonData changes

  return (
    <div className='max-w-full mx-auto text-center'>
      {loading ? (
        <p>Loading...</p> // Display loading text while data is being fetched
      ) : (
        <svg ref={svgRef}></svg> // Render the SVG element
      )}
    </div>
  );
};

export default BarGraph;
