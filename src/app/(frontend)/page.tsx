'use client'
import { AppShell, Group, Box, Text, Button, Image, Grid, Center, Flex} from '@mantine/core'
import Navbar from './components/Header'
import Content from './components/Container'
import style from './style.module.css'
import slide1 from '../../../public/bg3.png'
import { useState } from 'react'
import Footer from './components/Footer'


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <AppShell className={style.appshell}>
      {/* Top Navbar */}
      <Box className={style.imageWrapper}> 
        <Grid pt={60}>
          <Grid.Col  className={style.textbox} span={6}>
            <Box className={style.insidetextbox}>
              <Text className={style.text1} ta="left" size='1rem' fw={600}>Welcome to</Text>
              <Text className={style.text} ta="left" size='3rem' fw={600}>Restro Land Restaurant</Text>
              <Text className={style.text} ta="left" size="3rem" fw={600}>and Enjoy <span className={style.textspan}>The Food</span></Text>            
              <Text className={style.paratext}>Whether it's a cozy date night or a lively family gathering, our warm <br/> atmosphere and exceptional service provide the perfect backdrop <br/> for any occasion. Book your table online to guarantee your spot.</Text>
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
              src={slide1.src}
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
