import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Trip } from '../../Models/trip';
import { Grid } from '@mui/material';

interface Props {
    trip: Trip;
}

export default function TripCard({ trip }: Props) {

    return (
        
        <Card elevation={3} sx={{ maxWidth: 345 }} >
            <CardMedia
                component="img"
                height="160"
                image="https://www.natours.dev/img/tours/tour-2-cover.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {trip.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {trip.shortDescription.substring(0,10)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
       
    );
}