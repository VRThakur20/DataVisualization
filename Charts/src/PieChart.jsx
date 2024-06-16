import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const PieChart = () => {
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
      const width = 400; // Adjusted width
      const height = 400; // Adjusted height
      const margin = 40;

      const radius = Math.min(width, height) / 2 - margin;
      const innerRadius = radius * 0.4; // Adjusted inner radius

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const acvData = d3.rollup(
        jsonData,
        (v) => d3.sum(v, (d) => d.acv),
        (d) => d.Cust_Type
      );
      const totalACV = Array.from(acvData.values()).reduce((a, b) => a + b, 0);

      const color = d3
        .scaleOrdinal()
        .domain(acvData.keys())
        .range(["#1f77b4", "#ff7f0e"]);

      const pie = d3.pie().value((d) => d[1]);

      const data_ready = pie(Array.from(acvData.entries()));

      const arc = d3.arc().innerRadius(innerRadius).outerRadius(radius);

      svg
        .selectAll("path")
        .data(data_ready)
        .join("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data[0]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .style("font-size", "24px")
        .text(`Total $${(totalACV / 1000).toFixed(0)}K`);

      const labelArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg
        .selectAll("text.label")
        .data(data_ready)
        .join("text")
        .attr("class", "label")
        .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
        .attr("dy", "0.35em")
        .attr("dx", (d) =>
          (d.endAngle + d.startAngle) / 2 > Math.PI ? "-1.5em" : "1.5em"
        )
        .attr("text-anchor", (d) =>
          (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start"
        )
        .text(
          (d) =>
            `${d.data[0]} $${(d.data[1] / 1000).toFixed(0)}K (${(
              (d.data[1] / totalACV) *
              100
            ).toFixed(0)}%)`
        );

      svg
        .selectAll("polyline")
        .data(data_ready)
        .join("polyline")
        .attr("points", (d) => {
          const pos = labelArc.centroid(d);
          pos[0] =
            (radius * 0.95 * (d.endAngle + d.startAngle)) / 2 > Math.PI ? -1 : 1;
          return [arc.centroid(d), labelArc.centroid(d), pos];
        })
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "1px");
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

export default PieChart;
