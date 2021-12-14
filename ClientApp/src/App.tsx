import React, { useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import  Home  from './pages/HomePage/Home';
import Header from './components/header/Header';

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
                </Layout>
            </ThemeProvider>
    );
  
}
