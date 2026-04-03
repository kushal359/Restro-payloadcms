'use client'

import { useState, useEffect } from 'react'
import { Stack, Grid, Title, Card, Text, Group, Container, Flex, Box } from '@mantine/core'
import Link from 'next/link'
import { fetchMenu } from '../../lib/fetchmenu'
import style from './style.module.css'
import { fetchtestimony } from '../../lib/fetchtestimonial'
import { fetchCat } from '../../lib/fetchcat'
import { useRef } from 'react'

/**
 * sluggify function
 */
function slugify(data: string) {
  return data
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, '')
    ?.replace(/\s+/g, '-')
}

export default function Content({ selectedCategory }: any) {
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [tesItems, setTesItems] = useState<any>([])
  const [categories, setCategories] = useState<any>([]);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})

  /**
   * Fetch menu
   */
  useEffect(() => {
    const getMenu = async () => {
      const items = await fetchMenu()
      const sorted = items.sort((a: any, b: any) => a.order - b.order);
      setMenuItems(sorted)
    }
    getMenu()
  }, [])

  /**
   * get categories
   */

  useEffect(() => {
    const getCat = async () => {
      const items = await fetchCat()
      const sorted = items.sort((a: any, b: any) => a.order - b.order);
      setCategories(sorted);
    }
    getCat()
  }, [])

  useEffect(() => {
    if (selectedCategory && categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [selectedCategory])

  /**
   * Grab Featured items from all items
   */
  const featuredItems = menuItems?.filter((item: any) => item.isFeatured)
 

   /**
     * Fetch Testimonial
     */
    useEffect(() => {
      const gettestimony = async () => {
        const items = await fetchtestimony()
        setTesItems(items)
      }
      gettestimony()
    }, [])

    const filterTesti = tesItems?.filter((item: any) => {
      const matchtesti = item?.featured === true
      return matchtesti;
    })

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Stack gap="md" mt="xl">
          <Group justify="space-between">
            {featuredItems && ( !selectedCategory) && (
              <Title order={2}>Featured Dishes</Title>
            )}
          </Group>
            
          <Grid>
            {featuredItems?.map((item: any) => (
                <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 3 }}>
                <a className={style.featuredanchor} href={`/description/${slugify(item.name)}`}>
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
                </a>
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
            {categories.map((category: any) => (
            <Grid.Col
            key={category.id}
            span={12}
            className="catSection"
            ref={(el) => {
              categoryRefs.current[category.name] = el
            }}          >
      <Title order={3} ta="center" my="lg">
        {category.name}
      </Title>

      <Grid className={style.catmenucol} gap="md">
              {menuItems
                .filter((item) => item.category?.name === category.name)
                .slice(0, 4)
                .map((item: any) => (
                  <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 6 }}>
                    <a
                      className={style.linktd}
                      href={`/description/${slugify(item.name)}`}
                    >
                      <Card radius="sm" padding="sm" className={style.filtermenuCard}>
                        <Flex align="center" gap="sm">
                          <div className={style.innerfiltermenu}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item.image?.[0]?.url}`}
                              className={style.innerfiltermenuImg}
                              alt={item.name}
                            />
                          </div>

                          <Stack gap={2} style={{ flex: 1 }}>
                            <Group justify="space-between">
                              <Text fw={600} size="sm">
                                {item.name}
                              </Text>
                              <Text fw={600} c="orange" size="sm">
                                ${item.price}
                              </Text>
                            </Group>

                            <Text size="xs" c="dimmed" lineClamp={2}>
                              {item.description?.replace(/<[^>]+>/g, '')}
                            </Text>
                          </Stack>
                        </Flex>
                      </Card>
                    </a>
                  </Grid.Col>
                ))}
            </Grid>
          </Grid.Col>
        ))}
      </Grid>
      </Stack>
      {/* Testimonial Section */}
      <Stack gap="xs">
        <Box mt="xl" className={style.testimonbox}>
          <Text ta="center" fw="600"  className={style.innertesttext}>HEAR OUR CUSTOMERS</Text>
          <Grid  className={style.testigrid} justify="center">
            {filterTesti?.map((item: any)=>(
               <Grid.Col key={item?.id} span={{ base: 12, sm: 6, md: 3 }}>
                  <Card
                    radius="lg"
                    shadow="md"
                    padding="xl"
                    withBorder
                    className={style.featureddish}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}${item?.personimage?.url}`}
                      className={style.featureddishimage}
                    />

                    <Stack gap={4} mt="sm">
                      <Group justify="space-between">
                        <Text fw={700}>{item?.name}</Text>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2}>
                        {item?.testimony}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
            ))}
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
