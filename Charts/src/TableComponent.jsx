import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import * as d3 from 'd3';
import './TableComponent.css';

const TableComponent = () => {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef();

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

  useEffect(() => {
    if (jsonData) {
      const table = d3.select(tableRef.current);
      table.selectAll('*').remove(); // Clear previous table if any

      // Calculate totals
      const totalCount = d3.sum(jsonData, d => d.count);
      const totalACV = d3.sum(jsonData, d => d.acv);

      // Prepare data for the table
      const groupedData = d3.group(jsonData, d => d.closed_fiscal_quarter);
      const quarters = Array.from(groupedData.keys());
      const customerTypes = ['Existing Customer', 'New Customer'];

      const tableData = [];
      quarters.forEach(quarter => {
        const quarterData = { quarter, types: {} };
        customerTypes.forEach(type => {
          const typeData = groupedData.get(quarter).find(d => d.Cust_Type === type) || { count: 0, acv: 0 };
          quarterData.types[type] = {
            count: typeData.count,
            acv: typeData.acv,
            percent: ((typeData.count / totalCount) * 100).toFixed(2) + '%'
          };
        });
        tableData.push(quarterData);
      });

      // Create table header
      const thead = table.append('thead');
      const headerRow1 = thead.append('tr');
      headerRow1.append('th').text('Closed Fiscal Quarter');
      quarters.forEach(quarter => {
        headerRow1.append('th').attr('colspan', 3).attr('class', `quarter-${quarter}`).text(quarter);
      });
      headerRow1.append('th').attr('colspan', 3).attr('class', 'total').text('Total');

      const headerRow2 = thead.append('tr');
      headerRow2.append('th').text('Cust Type');
      quarters.forEach(quarter => {
        headerRow2.append('th').text('# of Opps');
        headerRow2.append('th').text('ACV');
        headerRow2.append('th').text('% of Total');
      });
      headerRow2.append('th').text('# of Opps');
      headerRow2.append('th').text('ACV');
      headerRow2.append('th').text('% of Total');

      // Create table body
      const tbody = table.append('tbody');
      customerTypes.forEach(type => {
        const row = tbody.append('tr');
        row.append('td').text(type);
        quarters.forEach(quarter => {
          const typeData = tableData.find(d => d.quarter === quarter).types[type];
          row.append('td').text(typeData.count);
          row.append('td').text(typeData.acv.toFixed(2));
          row.append('td').text(typeData.percent);
        });
        const totalCountType = d3.sum(jsonData.filter(d => d.Cust_Type === type), d => d.count);
        const totalACVType = d3.sum(jsonData.filter(d => d.Cust_Type === type), d => d.acv);
        row.append('td').text(totalCountType);
        row.append('td').text(totalACVType.toFixed(2));
        row.append('td').text(type === 'Existing Customer' ? '70%' : '30%');
      });

      // Create totals row
      const totalsRow = tbody.append('tr').attr('class', 'row-total');
      totalsRow.append('td').text('Total');
      quarters.forEach(quarter => {
        const quarterData = tableData.find(d => d.quarter === quarter);
        const totalCountQuarter = customerTypes.reduce((sum, type) => sum + quarterData.types[type].count, 0);
        const totalACVQuarter = customerTypes.reduce((sum, type) => sum + quarterData.types[type].acv, 0);
        totalsRow.append('td').text(totalCountQuarter);
        totalsRow.append('td').text(totalACVQuarter.toFixed(2));
        totalsRow.append('td').text(((totalCountQuarter / totalCount) * 100).toFixed(2) + '%');
      });
      totalsRow.append('td').text(totalCount);
      totalsRow.append('td').text(totalACV.toFixed(2));
      totalsRow.append('td').text('100%');
    }
  }, [jsonData]);

  return <table ref={tableRef} className="styled-table" />;
};

export default TableComponent;
