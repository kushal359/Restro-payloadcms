'use client'

import { Container, Box, Image, Grid, Text, Stack, GridCol } from "@mantine/core";
import Navbar from "../components/Header";
import style from "./style.module.css"
import slide1 from "../../../../public/bg2.jpeg";
import Footer from "../components/Footer";
import { fetchabo } from "../lib/fetchaboutus";
import { useState, useEffect } from "react";

export default function Aboutus(){

   const [aboItems, setAboItems] = useState<any>([])
        
         /**
         * Fetch Banner
         */
        useEffect(() => {
          const getcon = async () => {
            const items = await fetchabo()
            setAboItems(items)
          }
          getcon()
        }, [])
        const text = aboItems?.aboutusparagraphtext
            ?.replace(/<\/?[^>]+(>|$)/g, '')
    return(
         <>
        <Navbar/>
        <Container size="xl">
            <Box className={style.secondabout}>
                <Image
                    className={style.bgImage}
                    src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}${aboItems?.bgimageaboutus?.url}`}
                    alt="About background"
                />
                <Text fw="600" className={style.text1}>
                    {aboItems?.aboutText} <span className={style.aboutcom}>{aboItems?.aboutTexthighlight}</span>
                </Text>
                <Text className={style.text2}>
                    {text}
                </Text>
                </Box>
                <Box mt="xl" className={style.getintouchbox}>
                <Text ta="center" fw="600"  className={style.innertouchtext}>GET IN TOUCH</Text>
                <Text ta="center">"Hungry for more? Get in touch before we eat your order ourselves."</Text>
                </Box>
        </Container>
        <Footer/>
        </>
    );
}


