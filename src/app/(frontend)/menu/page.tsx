'use client'

import { useEffect, useState } from 'react'
import { Container, Grid, Flex, Stack, Card, Text, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { fetchMenu } from '../lib/fetchmenu'
import style from './style.module.css'
import Navbar from '../components/Header'
import Footer from '../components/Footer'
import { fetchCat } from '../lib/fetchcat'

function slugify(data: string) {
  return data
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any>([])
  useEffect(() => {
    const getMenu = async () => {
      const items = await fetchMenu()
      setMenuItems(items)
    }
    getMenu()
  }, [])

  useEffect(() => {
    const getCat = async () => {
      const items = await fetchCat()
      const sorted = items.sort((a: any, b: any) => a.order - b.order)
      setCategories(sorted)
    }
    getCat()
  }, [])
  console.log(categories)
  return (
    <>
      <Navbar />
      <Container className={style.maincontainer} size="md">
        {categories.map((category: any) => (
          <div key={category.id} style={{ marginBottom: '2rem' }}>
            <Title order={2} ta="center" my="lg">
              {category.name}
            </Title>

            <Grid gap="xs">
              {menuItems
                .filter((item) => item.category?.name === category.name)
                .map((item: any) => (
                  <Grid.Col key={item.id} span={6}>
                    <Link className={style.linktd} href={`/description/${slugify(item.name)}`}>
                      <Card radius="sm" padding="xs" className={style.filtermenuCard}>
                        <Flex align="center" gap="xs">
                          <div className={style.innerfiltermenu}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item.image?.[0]?.url}`}
                              className={style.innerfiltermenuImg}
                              alt={item.name}
                            />
                          </div>

                          <Stack gap={0} style={{ flex: 1 }}>
                            <Group justify="space-between">
                              <Text fw={600} size="xs">
                                {item.name}
                              </Text>
                              <Text fw={600} c="orange" size="xs">
                                ${item.price}
                              </Text>
                            </Group>

                            <Text size="xs" c="dimmed" lineClamp={1}>
                              {item.description?.replace(/<[^>]+>/g, '')}
                            </Text>
                          </Stack>
                        </Flex>
                      </Card>
                    </Link>
                  </Grid.Col>
                ))}
            </Grid>
          </div>
        ))}
      </Container>
      <Footer />
    </>
  )
}
