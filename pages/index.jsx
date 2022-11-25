import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import style from '../styles/home.module.scss'
import Logo from '../assets/images/logo.jpg';
import Header from '../src/components/header';

export default function Home(props) {

    return (
        <Box sx={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            p: 0,
            m: 0,
        }}>

            <Header />

        </Box>
    )
}
