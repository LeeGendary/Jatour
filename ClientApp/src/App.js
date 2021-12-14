import React, { useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Home  from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Header from './components/Header';

import './custom.css'

export default function App() {

    const [mode, setMode] = useState('light');
    

    const theme = createTheme({
                palette: {
                    mode,
                },
            });

    function handleThemeChange() {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    return (

            <ThemeProvider theme={theme}>
                <Header handleThemeChange={handleThemeChange} />
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                </Layout>
            </ThemeProvider>
    );
  
}
