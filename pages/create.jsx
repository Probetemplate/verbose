import React from 'react'
import Image from 'next/image';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Header from '../src/components/header'
import { AuthContext } from '../src/contexts/authContext';
import Banner from "../assets/images/banner.png";
import CreateQuestionsList from '../src/components/CreateQuestionsList';

export default function create(props) {

    const auth = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        title: "",
        description: "",
        banner: "",
        questions: [
            {
                id: 1,
                question: "1",
                type: "",
                score: 0,
                options: [""],
                correctIndex: 0,
            },
            {
                id: 2,
                question: "2",
                type: "",
                score: 0,
                options: [""],
                correctIndex: 0,
            },
            {
                id: 3,
                question: "3",
                type: "",
                score: 0,
                options: [""],
                correctIndex: 0,
            },
            {
                id: 4,
                question: "4",
                type: "",
                score: 0,
                options: [""],
                correctIndex: 0,
            },
        ],
    });

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

            <Box sx={{
                position: "relative",
                width: "100%",
                py: 2
            }}>
                <Box sx={{
                    width: "100%",
                    maxWidth: 770,
                    px: 2,
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}>

                    {/* Banner */}
                    <Box sx={{
                        width: "100%",
                        aspectRatio: "5",
                        overflow: "hidden",
                        position: "relative",
                        borderRadius: "15px"
                    }}>
                        <Image
                            src={Banner}
                            alt="banner"
                            layout='fill'
                        />
                    </Box>

                    {/* Title */}
                    <Box sx={{
                        width: "100%",
                        backgroundColor: "background.secondary",
                        position: "relative",
                        borderRadius: "15px",
                        py: 2,
                        px: 2,
                    }}>
                        <TextField
                            id="title"
                            label="Title"
                            variant="standard"
                            sx={{
                                width: "100%",
                                color: "#fff",
                                fontSize: "100px",
                                '& > div::before': {
                                    borderColor: "#aaa",
                                },
                                '& > div::after': {
                                    borderColor: "#90caf9",
                                },
                                '& > label.Mui-focused': {
                                    color: "#90caf9"
                                },
                                mb: 2
                            }}
                            value={data.title}
                            onChange={e => setData({ ...data, title: e.target.value })}
                        />

                        <TextField
                            id="description"
                            label="Description"
                            variant="standard"
                            sx={{
                                width: "100%",
                                color: "#fff",
                                fontSize: "100px",
                                '& > div::before': {
                                    borderColor: "#aaa",
                                },
                                '& > div::after': {
                                    borderColor: "#90caf9",
                                },
                                '& > label.Mui-focused': {
                                    color: "#90caf9"
                                },
                            }}
                            value={data.description}
                            multiline
                            onChange={e => setData({ ...data, description: e.target.value })}
                        />
                    </Box>

                    <CreateQuestionsList data={data} setData={setData} />

                </Box>
            </Box>
        </Box>
    )
}
