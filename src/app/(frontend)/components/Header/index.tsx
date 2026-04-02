'use client'

import {
  Text,
  Group,
  Grid,
  Input,
  Anchor,
  Box,
  Center,
  Divider,
  HoverCard,
  SimpleGrid,
  Burger,
  Drawer,
  Stack,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconChefHat, IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'
import style from './HeaderMenu.module.css'
import { FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { fetchCat } from '../../lib/fetchcat'
import { usePathname } from 'next/navigation'

export default function Navbar({ onSearch, onCategoryChange }: any) {
  const [categories, setCategories] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [opened, setOpened] = useState(false)
  const pathname = usePathname()
  const shouldLoadCategories = pathname === '/'
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const getCat = async () => {
      const data = await fetchCat()
      setCategories(data)
    }
    getCat()
  }, [])

  const scrollToHeight = () => {
    window.scrollTo({
      top: 580,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
  if (!shouldLoadCategories) return

  const getCat = async () => {
    const data = await fetchCat()
    setCategories(data)
  }

  getCat()
}, [shouldLoadCategories])

  return (
    <>
      <Grid className={style.GridContainer}>
        {/* Logo */}
        <Grid.Col span={isMobile ? 6 : 3} className={style.gridinner}>
          <Link className={style.textlink} href="/">
            <Group gap="xs">
              <IconChefHat size={26} />
              <Text fw={700} size="lg">
                Restro Land
              </Text>
            </Group>
          </Link>
        </Grid.Col>

        {/* Desktop Nav */}
        {!isMobile && (
          <Grid.Col span={6} className={style.gridinner}>
            <Group className={style.group}>
              <Link className={style.link} href="/aboutus">About Us</Link>
              <Link className={style.link} href="/">Menu</Link>
              <Link className={style.link} href="/contactus">Contact</Link>

             {shouldLoadCategories && ( 
              <HoverCard width={600} position="bottom" radius="md" shadow="md">
                <HoverCard.Target>
                  <Link href="#" className={style.link}>
                    <Center inline>
                      <Box mr={5}>Categories</Box>
                      <IconChevronDown size={16} />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  <SimpleGrid cols={2}>
                    {categories.map((cat, index) => (
                      <Anchor
                        key={index}
                        className={style.dropdownItem}
                        onClick={() => {
                          onCategoryChange(cat.name)
                          scrollToHeight()
                        }}
                      >
                        {cat.name}
                      </Anchor>
                    ))}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>)}
            </Group>
          </Grid.Col>
        )}

        {/* Search */}
        {!isMobile && (
          <Grid.Col span={3} className={style.gridinner}>
            <Input
              placeholder="Search Food..."
              radius="xl"
              value={searchValue}
              onChange={(e) => {
                const value = e.currentTarget.value
                setSearchValue(value)
                onSearch(value)
              }}
              leftSection={<FaSearch size={14} />}
            />
          </Grid.Col>
        )}

        {/* Mobile Burger */}
        {isMobile && (
          <Grid.Col span={6} className={style.gridinner} style={{ justifyContent: 'flex-end', paddingRight: 20 }}>
            <Burger opened={opened} onClick={() => setOpened(!opened)} />
          </Grid.Col>
        )}
      </Grid>

      {/* Mobile Drawer */}
      <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="md" size="75%">
        <Stack>
          <Link href="#about-us">About Us</Link>
          <Link href="#menu">Menu</Link>
          <Link href="#review">Review</Link>
          <Link href="#contact-us">Contact</Link>

          <Divider />

          <Text fw={500}>Categories</Text>
          {categories.map((cat, index) => (
            <Anchor
              key={index}
              onClick={() => {
                onCategoryChange(cat.name)
                scrollToHeight()
                setOpened(false)
              }}
            >
              {cat.name}
            </Anchor>
          ))}

          <Divider />
          <Input
            placeholder="Search Food..."
            value={searchValue}
            onChange={(e) => {
              const value = e.currentTarget.value
              setSearchValue(value)
              onSearch(value)
            }}
            leftSection={<FaSearch size={14} />}
          />
        </Stack>
      </Drawer>
    </>
  )
}