'use client'
import { AppShell, Group, Box, Text, Button, Image, Grid, Center, Flex} from '@mantine/core'
import Navbar from './components/Header'
import Content from './components/Container'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import { fetchBan } from './lib/fetchbanner'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [banItems, setBanItems] = useState<any>([])


    /**
     * Fetch Banner
     */
    useEffect(() => {
      const getbanner = async () => {
        const items = await fetchBan()
        setBanItems(items)
      }
      getbanner()
    }, [])


    const text = banItems?.paragraphtext
  ?.replace(/<\/?[^>]+(>|$)/g, '')
  return (
    <AppShell className={style.appshell}>
      {/* Top Navbar */}
      <Box className={style.imageWrapper}> 
        <Grid pt={60}>
          <Grid.Col className={style.textbox} span={6}>
            <Box className={style.insidetextbox}>
              <Text className={style.text1} ta="left" size='1rem' fw={600}>{banItems?.welcomeText}</Text>
              <Text className={style.text} ta="left" size='3rem' fw={600}>{banItems?.mainHeadingLine1}</Text>
              <Text className={style.text} ta="left" size="3rem" fw={600}>{banItems?.mainHeadingLine2}<span className={style.textspan}>{banItems?.highlightText}</span></Text>            
              <Text className={style.paratext} >{text}</Text>
              <Flex className={style.buttontex} mt={20} gap={15}>
                <Button color='#ff6600' className={style.buttontex1}>Reserve a table</Button>
                <Button color='#ff6600' variant="outline" className={style.buttontex2} >Order online</Button>
              </Flex>
              </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Image
              radius="md"
              className={style.bgImage}
              loading="lazy"
              src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}${banItems?.heroImage?.url}`}
            />
          </Grid.Col>
        </Grid>

        <Box className={style.navbarWrapper}>
          <Navbar onSearch={setSearchQuery} onCategoryChange={setSelectedCategory} />
        </Box>
      </Box>

      <Box>
        <Content searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </Box>
      <Box>
        <Footer/>
      </Box>
    </AppShell>
  )
}
