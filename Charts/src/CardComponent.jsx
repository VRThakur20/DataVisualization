import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import BarGraph from './BarGraph'; 
import PieChart from './PieChart'; 
import TableComponent from './TableComponent';

const CardComponent = () => {
  return (
    <Card style={{ width: '100%' }}>
      <CardContent>
        <div className='max-w-full mx-auto text-center '>
        <Typography variant="h5" component="div" gutterBottom>
          Won ACV by mix Cust Type
        </Typography>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-8" >
          <div className="col-span-4 "  >
            <BarGraph />
          </div>
          <div className="col-span-2 " >
            <PieChart />
          </div>
        </div>
        <Box width="100%" marginTop={2}>
          <TableComponent />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
