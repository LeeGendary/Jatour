import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        axios.get("api/Trips").then(res => {
            const data = res.data;
            setTrips(data);
        })
    },[]);

    return (
      <div>
        <h1>Hello, world!</h1>
        
            <ul>
                {
                    trips.map(e => (
                        <li key={e.id} > { e.title } </li>
                    ))
                }
            </ul>
       </div>
    );
}
