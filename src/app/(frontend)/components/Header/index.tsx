
import { Text, Group, Grid} from "@mantine/core";
import { IconChefHat } from '@tabler/icons-react';
import Link from "next/link";
import style from './HeaderMenu.module.css'
import { Input } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <Grid className={style.GridContainer}>
      <Grid.Col className={style.gridinner} span={4}>
        <Link href='#'>
                  <Group gap="xs" px="lg">
                    <IconChefHat size={28} stroke={1.8} />
                    <Text fw={700} size="lg">
                        Restro App
                    </Text>
                </Group>
              </Link>
      </Grid.Col>
      <Grid.Col className={style.gridinner} span={4}>
        {/* Navigation Menu */}
        <Group className={style.group} gap="xl">
            <Link className={style.link} href="#about-us"><Text fw={600}>About Us</Text></Link>
            <Link className={style.link} href="#menu"><Text fw={600}>Menu</Text></Link>
            <Link className={style.link} href="#review"><Text fw={600}>Review</Text></Link>
            <Link className={style.link} href="#contact-us"><Text fw={600}>Contact Us</Text></Link>
        </Group>
      </Grid.Col>
      <Grid.Col className={style.gridinner} span={4}>
        <Input placeholder="Search Food" leftSection={<FaSearch size={16} />} />
      </Grid.Col>
    </Grid>
  );
}


