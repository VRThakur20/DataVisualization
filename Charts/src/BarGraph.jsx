import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const BarGraph = () => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fetchData');
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const svgRef = useRef();

  useEffect(() => {
    if (jsonData) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 30, right: 30, bottom: 40, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      svg.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const quarters = Array.from(new Set(jsonData.map(d => d.closed_fiscal_quarter)));
      const x = d3.scaleBand().domain(quarters).range([0, width]).padding(0.2);

      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      const maxY = d3.max(jsonData, d => d.acv);
      const y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);

      g.append('g').call(d3.axisLeft(y));

      quarters.forEach(quarter => {
        const quarterData = jsonData.filter(d => d.closed_fiscal_quarter === quarter);
        const totalACV = d3.sum(quarterData, d => d.acv);
        const totalCount = d3.sum(quarterData, d => d.count);

        let offsetY = 0;
        quarterData.forEach(d => {
          const barHeight = height - y(d.acv);
          const percentage = ((d.count / totalCount) * 100).toFixed(2);

          g.append('rect')
            .attr('x', x(quarter))
            .attr('y', y(d.acv) - offsetY)
            .attr('width', x.bandwidth())
            .attr('height', barHeight)
            .attr('fill', d.Cust_Type === 'Existing Customer' ? 'blue' : 'orange');

          g.append('text')
            .attr('x', x(quarter) + x.bandwidth() / 2)
            .attr('y', y(d.acv) - offsetY + barHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(`${percentage}%`);

          offsetY += barHeight;
        });

        g.append('text')
          .attr('x', x(quarter) + x.bandwidth() / 2)
          .attr('y', y(totalACV) - 10)
          .attr('text-anchor', 'middle')
          .attr('fill', 'black')
          .text(totalACV.toFixed(2));
      });
    }
  }, [jsonData]);

  return (
    <div className='max-w-full mx-auto text-center'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </div>
  );
};

export default BarGraph;

