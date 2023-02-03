import Head from 'next/head'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import style from '../styles/home.module.scss';
import Header from '../src/components/header';
import Footer from '../src/components/footer';

import BG1 from "../assets/images/bg/1.jpg";
import BG2 from "../assets/images/bg/2.jpg";
import BG3 from "../assets/images/bg/3.jpg";
import BG4 from "../assets/images/bg/4.jpg";
import BG5 from "../assets/images/bg/5.jpg";
import BG6 from "../assets/images/bg/6.jpg";
import BG7 from "../assets/images/bg/7.jpg";
import { useEffect } from 'react';
import { useState } from 'react';

const data = [
    {
        title: "QUIZ Application specially made for sutdents",
        description: "You can create your own quiz and share it with your friends and family. You can also play quiz created by other users.",
        bg: BG1,
        centered: false,
        active: true
    },
    {
        title: "Intuitive Quiz Builder",
        description: "Make unlimited customizable quiz, share the link globally with anyone and get quiz on. Also check the progress in the admin pannel.",
        bg: BG2,
        centered: false,
        active: false
    },
    {
        title: "Access the admin panel to edit the quiz",
        description: "Full premium quility features are available in the admin panel. Set timer of quiz and score of each questions manually which makes the experience more next level.",
        bg: BG3,
        centered: false,
        active: false
    },
    {
        title: "Free and Open Source",
        description: "This project is completely free and open source. You can contribute to this project by forking it on github and making pull requests.",
        bg: BG4,
        centered: false,
        active: false
    },
    {
        title: "Full restriction on the quiz",
        description: "You can set the time limit of the quiz and also the score of each question. You can also set the number of attempts for the quiz.",
        bg: BG5,
        centered: false,
        active: false
    }
];

export default function Home(props) {

    const [hero_data, setHero_data] = useState(data);

    useEffect(() => {
        const internal = setInterval(() => {
            // Set the active class to the next element
            let new_data = [...hero_data];
            let active_index = new_data.findIndex(item => item.active);
            new_data[active_index].active = false;
            if (active_index === new_data.length - 1) {
                new_data[0].active = true;
            } else {
                new_data[active_index + 1].active = true;
            }
            setHero_data(new_data);
        }, 10000);

        return () => {
            clearInterval(internal);
        }
    }, []);

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

            <Header sticky />

            <Box component="main" sx={{
                position: "relative",
                width: "100%",
                minHeight: "calc(100vh - 80px)",
                display: "grid",
                placeItems: "center",
                zIndex: 1,
            }}>

                {hero_data.map((item, index) => {
                    return (
                        <Box key={index} className={item.active ? "active" : ""} sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            px: "1rem",
                            py: "1.5rem",
                            zIndex: 1,
                            top: 0,
                            left: 0,
                            bgcolor: "background.paper",
                            color: "text.primary",
                            opacity: 0,
                            transition: "opacity 1s ease-in-out",
                            '&.active': {
                                opacity: 1,
                            }
                        }}>

                            <Image
                                src={item.bg}
                                layout="fill"
                                objectFit='cover'
                                loading='lazy'
                                style={{
                                    zIndex: "-1",
                                    opacity: "0.5",
                                }}
                            />

                            <div style={{
                                backgroundColor: "#00000060",
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                zIndex: "-1",
                            }}></div>

                            <Box sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "900px",
                                height: "100%",
                                margin: "0 auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: "5em",
                                textAlign: item.centered ? "center" : "left",
                            }}>
                                <Typography
                                    variant='h6'
                                    component='h1'
                                    sx={{
                                        fontSize: "2.5em"
                                    }}
                                >{item.title}</Typography>
                                <Typography
                                    variant='h6'
                                    component='p'
                                    sx={{
                                        fontSize: "1.5em",
                                        fontWeight: 400,
                                    }}
                                >{item.description}</Typography>
                            </Box>
                        </Box>
                    )
                })}

                {/* <Box sx={{
                    position: "relative",
                    width: "100%",
                    px: "1rem",
                    py: "1.5rem",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "stretch",
                    justifyContent: "center",
                    gap: "20px",
                    zIndex: 1,
                }}>

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Build, host and play amazing quizzes in minutes</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Enjoy online, interactive quizzing with friends and family</Typography>
                    </Box>

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Intuitive Quiz Builder</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Make unlimited customizable quiz, share the link with anyone and get quiz on.</Typography>
                    </Box>

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Access the admin panel to edit the quiz.</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Set timer of quiz and score of each questions manually which makes the experience more next level</Typography>
                    </Box>
                </Box> */}

            </Box>

            <Footer />

        </Box>
    )
}
