import React from 'react';
import { Add, Delete } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material'

interface SubscriptionCardProps {
  title: string;
  year: number;
  artist: string;
  img: string;
}

interface QueryCardProps {
  title: string;
  year: number;
  artist: string;
  img: string;
  subscribed: boolean;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, artist, year, img }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image={img}
        alt="Artist"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {artist}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {year}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="outlined" startIcon={<Delete />} size='small' color='error'>
            Remove
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export const QueryCard: React.FC<QueryCardProps> = ({ title, year, artist, img, subscribed }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image={img}
        alt="Artist"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {artist}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {year}
          </Typography>
        </CardContent>
        {!subscribed && <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Button variant="outlined" startIcon={<Add />} size='small' color='error'>
            Subscribe
          </Button>
        </Box>}
      </Box>
    </Card>
  );
}
