'use client'

import { useEffect, useState, use } from 'react'
import {
  AppShell,
  Group,
  Box,
  GridCol,
  Container,
  Title,
  Center,
  Stack,
  Grid,
  Card,
  Text,
} from '@mantine/core'
import Navbar from '../../components/Header'
import { fetchMenu } from '../../lib/fetchmenu'
import style from './style.module.css'
import Footer from '../../components/Footer'
/**
 * sluggify function
 */
function slugify(data: string) {
  return data
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
}

type Props = {
  params: Promise<{ slug: string }>
}

export default function Description({ params }: Props) {
  const { slug } = use(params)
  const [menuItems, setMenuItems] = useState<any[]>([])

  /**
   * Grab Featured items from all items
   */
  const featuredItems = menuItems?.filter((item: any) => item.isFeatured)

  /**
   * Fetch menu items
   */
  useEffect(() => {
    const getMenu = async () => {
      const items = await fetchMenu()
      setMenuItems(items)
    }
    getMenu()
  }, [])
  /**
   * map menuitems to allitems
   */
  const allItems = menuItems.flatMap((cat) => cat)

  /**
   * see if retured data of sluggify matches paramter slug we fetched
   */
  const item = allItems.find((i) => slugify(i?.name) === slug)

  if (!item) {
    return <h1>Item not found</h1>
  }

  return (
    <AppShell className={style.appshell}>
      <Box px="sm" py="sm">
        <Group justify="space-between">
          <Navbar />
        </Group>
      </Box>
      <Container size="lg" p="xl">
        <Stack>
          <Grid>
            <GridCol span={{ base: 12, md: 6 }}>
              <Stack>
                <h1>{item?.name}</h1>

                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                />
                <Text size="sm" className={style.para}>
                  Experience a fresh take on seasonal flavors where every plate tells a story. From
                  our farm-to-table ingredients to our hand-crafted cocktails, we invite you to
                  savor the art of modern dining. Join us for an unforgettable evening in the heart
                  of the city.
                </Text>
                <Box>
                  <b className={style.desprice}>$ {item?.price}</b>
                </Box>
              </Stack>
            </GridCol>

            <GridCol span={{ base: 12, md: 6 }}>
              <img
                src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item?.image[0]?.url}`}
                className={style.detailsimg}
              />
            </GridCol>
          </Grid>
        </Stack>
      </Container>
      <Box className={style.trendbox}>
        <Stack gap="md" mt="xl" mb="xl">
          <Group justify="space-between">
            <Title order={2}>Featured Dishes</Title>
          </Group>

          <Grid>
            {featuredItems?.map((item: any) => (
              <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 3 }}>
                <Card
                  radius="lg"
                  shadow="md"
                  padding="md"
                  withBorder
                  className={style.featureddish}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item.image?.[0]?.url}`}
                    className={style.featureddishimage}
                  />

                  <Stack gap={4} mt="sm">
                    <Group justify="space-between">
                      <Text fw={700}>{item.name}</Text>
                      <Text fw={700} c="orange">
                        ${item.price}
                      </Text>
                    </Group>

                    <Text size="sm" c="dimmed" lineClamp={2}>
                      {item.description?.replace(/<[^>]+>/g, '')}
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Box>
      <Footer />
    </AppShell>
  )
}
