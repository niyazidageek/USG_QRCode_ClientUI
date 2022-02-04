import React from 'react';
import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box left={'50%'} top={'50%'} position={'absolute'} style={{transform:'translate(-50%,-50%)'}} >
        <Typography fontWeight={'bold'} fontSize={'2rem'}>
            Sorry, page was not found 😕
        </Typography>
    </Box>
  )
}
