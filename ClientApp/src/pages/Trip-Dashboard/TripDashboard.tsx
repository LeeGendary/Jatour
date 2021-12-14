import { Paper } from "@mui/material";
import { Grid } from "@mui/material"
import React from "react"
import { Trip } from "../../Models/trip"

interface Props {
    trips: Trip[];
}

export default function TripDashboard({ trips }: Props) {

    return(
        <Grid container spacing={2}>
            <Grid item xs={2} md={2} >
                <Paper elevation={3}>
                    <p>Option</p>
                </Paper>
            </Grid>
            <Grid item xs={10} md={10}>
                <Paper elevation={3}>
                <ul>
                    {
                        trips.map(e => (
                            <li key={e.id}> {e.author}</li>
                        ))
                        }
                
                    </ul>
                    </Paper>
            </Grid>
        </Grid>
    );
}