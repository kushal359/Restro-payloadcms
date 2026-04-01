"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  Grid,
  Title,
  Card,
  Text,
  Group,
  Container,
} from "@mantine/core";
import Link from "next/link";
import classes from "../Container/styles/contentstyle.module.css";
import { fetchMenu } from "../../lib/fetchmenu";
import { fetchCat } from "../../lib/fetchcat";
import slide1 from "@/../public/bg.jpg";
import { Image } from '@mantine/core';
import style from './style.module.css';
import { IconChefHat } from '@tabler/icons-react';


function slugify(data: string) {
  return data
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function Content() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [catItems, setCatItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      const items = await fetchMenu();
      setMenuItems(items);
    };
    getMenu();
  }, []);

  useEffect(() => {
    const getCat = async () => {
      const categories = await fetchCat();
      setCatItems(categories);
    };
    getCat();
  }, []); 

  const filteredMenu = menuItems?.filter((item: any) =>
    !selectedCategory || item.category?.name === selectedCategory
  );
  console.log(process.env.NEXT_PUBLIC_SERVER_API_URL)
  return (
    <Container size="xl">
        <div className={style.imageWrapper}>
        <Image
            radius="md"
            h={500}
            src={slide1.src}
            style={{ width: "100%" }}
        />
        <Text className={style.centeredText}><IconChefHat width={80} height={80} stroke={2}/><br/>Welcome to <br/><b> Restro Best Food <br/> In Town</b> </Text>
        </div>
      
      <Stack gap="xl">

        <Title order={2} className={style.cat}>Category</Title>

        <Grid>
          {catItems.map((cat) => (
            <Grid.Col key={cat.id} span={{ base: 12, sm: 3, md: 2 }}>
              <Card
                withBorder
                style={{
                  cursor: "pointer",
                  backgroundColor: "#BB3E00",
                  color: "#fff",
                  border:
                    selectedCategory === cat.name
                      ? "2px solid #339af0"
                      : undefined,
                }}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? null : cat.name
                  )
                }
              >
                <Text fw={600}>{cat.name}</Text>
                {/* <Text size="sm">
                  {menuItems.filter((item: any) => item.category?.name === cat.name)
                    .length}{" "}
                  items
                </Text> */}
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Group justify="space-between">
          <Title order={2}>Special Menu For You</Title>
          {selectedCategory && (
            <Text onClick={() => setSelectedCategory(null)} c="blue" style={{ cursor: "pointer" }}>
              Show All
            </Text>
          )}
        </Group>

        <Grid>
          {filteredMenu?.map((item: any) => (
            <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 3 }}>
              <Link href={`/description/${slugify(item.name)}`}>
                <Card className={classes.card} withBorder>
                  <img
                    src={
                      item.image?.[0]?.url
                        ? `http://localhost:3000${item.image[0].url}`
                        : ""
                    }
                    style={{
                      width: "100%",
                      height: 260,
                      objectFit: "cover",
                    }}
                  />
                  <Group justify="space-between" mt="xs">
                    <Text fw={600}>{item.name}</Text>
                    <Text fw={700}>${item.price}</Text>
                  </Group>
                  <Text size="sm" c="dimmed" lineClamp={2}>
                    {item.description?.replace(/<[^>]+>/g, "")}
                  </Text>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}