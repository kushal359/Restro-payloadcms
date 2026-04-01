'use client'

import { useState, useEffect } from 'react'
import { Stack, Grid, Title, Card, Text, Group, Container, Flex, Box } from '@mantine/core'
import Link from 'next/link'
import { fetchMenu } from '../../lib/fetchmenu'
import style from './style.module.css'

/**
 * sluggify function
 */
function slugify(data: string) {
  return data
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
}

export default function Content({ searchQuery, selectedCategory }: any) {
  const [menuItems, setMenuItems] = useState<any[]>([])

  /**
   * Fetch menu
   */
  useEffect(() => {
    const getMenu = async () => {
      const items = await fetchMenu()
      setMenuItems(items)
    }
    getMenu()
  }, [])

  /**
   * Grab Featured items from all items
   */
  const featuredItems = menuItems?.filter((item: any) => item.isFeatured)
  /**
   * Filter menu items
   */
  const filteredMenu = menuItems?.filter((item: any) => {
    const matchesCategory = !selectedCategory || item.category?.name === selectedCategory

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Stack gap="md" mt="xl">
          <Group justify="space-between">
            {featuredItems && (searchQuery || !selectedCategory) && (
              <Title order={2}>Featured Dishes</Title>
            )}
          </Group>

          <Grid>
            {featuredItems &&
              (searchQuery || !selectedCategory) &&
              featuredItems?.map((item: any) => (
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

         <Group justify="space-between">
          <Title order={2}>Our Menu Items</Title>
          {selectedCategory && (
            <Text c="#ff6600" style={{ cursor: 'pointer' }}>
              Show All
            </Text>
          )}
        </Group>
        
        <Grid gap="xs">
          {filteredMenu?.map((item: any) => (
            <Grid.Col key={item.id} span={6}>
              <Link className={style.linktd} href={`/description/${slugify(item.name)}`}>
                <Card
                    radius="sm"
                    padding="xs"
                    className={style.filtermenuCard}
                  >
                    <Flex align="center" gap="xs">
                      <div className={style.innerfiltermenu}>
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item.image?.[0]?.url}`}
                          className={style.innerfiltermenuImg}
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
      </Stack>
      {/* Testimonial Section */}
      <Stack gap="xs">
        <Box mt="xl" className={style.testimonbox}>
          <Text ta="center" fw="600"  className={style.innertesttext}>HEAR OUR CUSTOMERS</Text>
          <Grid  className={style.testigrid} justify="center">
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card
                    radius="lg"
                    shadow="md"
                    padding="md"
                    withBorder
                    className={style.featureddish}
                  >
                    <img
                      src="https://picsum.photos/id/16/200/300"
                      className={style.featureddishimage}
                    />

                    <Stack gap={4} mt="sm">
                      <Group justify="space-between">
                        <Text fw={700}>KP OLI</Text>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2}>
                        "Very Tasty Food Loved the Place and Loved the Vibe"
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

               <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card
                    radius="lg"
                    shadow="md"
                    padding="md"
                    withBorder
                    className={style.featureddish}
                  >
                    <img
                      src="https://picsum.photos/id/4/200/300"
                      className={style.featureddishimage}
                    />

                    <Stack gap={4} mt="sm">
                      <Group justify="space-between">
                        <Text fw={700}>Sher Bahadur Deuba</Text>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2}>
                        Very Tasty Food Loved the Place and Loved the Vibe
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

               <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card
                    radius="lg"
                    shadow="md"
                    padding="md"
                    withBorder
                    className={style.featureddish}
                  >
                    <img
                      src="https://picsum.photos/id/8/200/300"
                      className={style.featureddishimage}
                    />

                    <Stack gap={4} mt="sm">
                      <Group justify="space-between">
                        <Text fw={700}>Prachanda</Text>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2}>
                        Very Tasty Food Loved the Place and Loved the Vibe
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
          </Grid>
        </Box>

        <Box mt="xl" className={style.getintouchbox}>
          <Text ta="center" fw="600"  className={style.innertouchtext}>GET IN TOUCH</Text>
          <Text ta="center">"Hungry for more? Get in touch before we eat your order ourselves."</Text>
        </Box>
      </Stack>
    </Container>
  )
}
