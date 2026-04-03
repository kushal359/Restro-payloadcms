'use client'

import { Container, Box, Image, Grid, Text, Stack, GridCol } from '@mantine/core'
import Navbar from '../components/Header'
import style from './style.module.css'
import Footer from '../components/Footer'
import { fetchCon } from '../lib/fetchcontactus'
import { useEffect, useState } from 'react'

export default function Contactus() {
  const [conItems, setConItems] = useState<any>([])

  /**
   * Fetch Banner
   */
  useEffect(() => {
    const getcon = async () => {
      const items = await fetchCon()
      setConItems(items)
    }
    getcon()
  }, [])

  return (
    <>
      <Navbar />
      <Container size="xl">
        <Box className={style.secondabout}>
          <Image
            className={style.bgImage}
            src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}${conItems?.bgimagecontactus?.url}`}
            alt="About background"
          />
          <Text fw="600" className={style.text1}>
            {conItems?.contactText}
            <span className={style.aboutcom}> {conItems?.contactTexthighlight}</span>
          </Text>
          <Text className={style.text2}>{conItems?.contactusparagraphtext}</Text>
          <Text className={style.text2}>
            <span className={style.aboutcom}>{conItems?.contactph}</span> {conItems?.contactdetails}{' '}
            <span className={style.aboutcom}>{conItems?.email}</span>
            {conItems?.emaildetails}
          </Text>
        </Box>
        <Box mt="xl" className={style.getintouchbox}>
          <Text ta="center" fw="600" className={style.innertouchtext}>
            GET IN TOUCH
          </Text>
          <Text ta="center">
            "Hungry for more? Get in touch before we eat your order ourselves."
          </Text>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
