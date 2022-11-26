import React from 'react'

import Box from '@mui/material/Box';

import Header from '../../src/components/header'

export default function Quiz(props) {
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
