import React from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material'

export const SubscriptionCard = () => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Live From Space
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="outlined" startIcon={<Delete />} size='small' color='error'>
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export const QueryCard = () => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            Live From Space
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
