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
  Modal,
  Container
} from '@mantine/core'
import { IconChefHat, IconChevronDown, IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import style from './HeaderMenu.module.css'
import { FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { fetchCat } from '../../lib/fetchcat'
import { usePathname } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'
import { Image } from '@mantine/core'
import { fetchMenu } from '../../lib/fetchmenu'

export default function Navbar({ onCategoryChange }: any) {
  const [categories, setCategories] = useState<any[]>([])
  const [opened, setOpened] = useState(false)
  const [openedsearch, { open, close }] = useDisclosure(false)
  const [searchValue, setSearchValue] = useState('')
  const [items, setItems] = useState<any[]>([])
const [filteredItems, setFilteredItems] = useState<any[]>([])
  const pathname = usePathname()
  const shouldLoadCategories = pathname === '/'

  useEffect(() => {
    if (!shouldLoadCategories) return

    const getCat = async () => {
      const data = await fetchCat()
      setCategories(data)
    }

    getCat()
  }, [shouldLoadCategories])

  const scrollToHeight = () => {
    window.scrollTo({
      top: 580,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
  const getItems = async () => {
    const data = await fetchMenu()
    setItems(data)
    setFilteredItems(data)
  }

  getItems()
}, [])

  const handleSearch = (value: string) => {
  setSearchValue(value)

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  )

  setFilteredItems(filtered)
}

  return (
    <>
      <Grid className={style.GridContainer} align="center">
        {/* Logo */}
        <Grid.Col span={{ base: 6, sm: 3 }}>
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
        <Grid.Col span={{ base: 0, sm: 7 }} visibleFrom="sm">
          <Group className={style.group}>
            <Link className={`${style.link} ${pathname === '/aboutus' ? style.active : ''}`} href="/aboutus">
              About Us
            </Link>
            <Link className={`${style.link} ${pathname === '/menu' ? style.active : ''}`} href="/menu">
              Menu
            </Link>
            <Link className={`${style.link} ${pathname === '/contactus' ? style.active : ''}`} href="/contactus">
              Contact
            </Link>

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

                <HoverCard.Dropdown className={style.cate}>
                  <SimpleGrid cols={3}>
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
              </HoverCard>
            )}
          </Group>
        </Grid.Col>

        {/* Desktop Search Icon ✅ FIXED */}
        <Grid.Col span={{ base: 0, sm: 2 }} visibleFrom="sm">
          <Center style={{ height: '100%' }}>
            <IconSearch
              size={22}
              color="#000"
              style={{ cursor: 'pointer' }}
              onClick={open}
            />
          </Center>
        </Grid.Col>

        {/* Mobile Burger */}
        <Grid.Col
          span={{ base: 6, sm: 0 }}
          hiddenFrom="sm"
          style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}
        >
          <Burger opened={opened} onClick={() => setOpened(!opened)} />
        </Grid.Col>
      </Grid>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Menu"
        padding="md"
        size="100%"
      >
        <Stack gap="md">
          <Link href="/aboutus" onClick={() => setOpened(false)}>About Us</Link>
          <Link href="/menu" onClick={() => setOpened(false)}>Menu</Link>
          <Link href="/contactus" onClick={() => setOpened(false)}>Contact</Link>

          <Divider />

          {shouldLoadCategories && (
            <>
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
            </>
          )}

          {/* Mobile Search Icon */}
          <IconSearch
            className={style.searchicon}
            onClick={() => {
              setOpened(false)
              open()
            }}
          />
        </Stack>
      </Drawer>

      {/* Search Modal */}
     <Modal opened={openedsearch} size="lg" onClose={close} title="Search Food" centered>
        <Input
          placeholder="Search Food..."
          radius="xl"
          size="sm"
          value={searchValue}
          onChange={(e) => handleSearch(e.currentTarget.value)}
          leftSection={<FaSearch size={12} />}
        />

        <Container mt="sm">
          {searchValue && filteredItems.length > 0 ? (
            <Stack
              style={{ width: '100%', alignItems: 'center' }}
              gap="xs"
            >              
            {filteredItems.map((item, index) => (
                <Box
                    key={index}
                    p="sm"
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 6,
                      cursor: 'pointer',
                      width: '50%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      onCategoryChange(item.name)
                      close()
                    }}
                  >
                  <Group p="xs" style={{ width: '100%', justifyContent: 'center' }}>                    
                    {item.image && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${item.image?.[0]?.url}`}
                        width={32}
                        height={32}
                        radius="sm"
                      />
                    )}
                    <div>
                      <Text fw={500} size="sm">
                        {item.name}
                      </Text>
                      {item.price && (
                        <Text size="xs" c="dimmed">
                          ${item.price}
                        </Text>
                      )}
                    </div>
                  </Group>
                </Box>
              ))}
            </Stack>
          ) : (
            <Text size="xs" c="dimmed" mt="xs">
              No items found
            </Text>
          )}
        </Container>
      </Modal>
          </>
  )
}