import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trip } from '../../Models/trip';
import TripDashboard from '../Trip-Dashboard/TripDashboard';

export default function Home() {
    const [trips, setTrips] = useState <Trip[]>([]);

    useEffect(() => {
        axios.get< Trip[]>("api/Trips").then(res => {
            const data = res.data;
            setTrips(data);
        })
    },[]);

    return (
        <>
            <TripDashboard trips={trips} />
        </>
    );
}
