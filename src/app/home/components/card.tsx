import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
