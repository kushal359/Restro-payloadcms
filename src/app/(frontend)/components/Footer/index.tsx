import { Container, Grid, Text, Title, List, Anchor, Group } from "@mantine/core";
import Link from "next/link";
import styles from "./style.module.css"

export default function Footer () {
  return(
    <footer className={styles.footer}>
      
      <Container size="lg">
        <Grid>

          {/* Brand */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={3}>Restro Land</Title>
            <Text size="sm" mt="sm" c="dimmed">
              Serving delicious meals made with fresh ingredients. Experience taste like never before.
            </Text>
          </Grid.Col>

          {/* Navigation */}
          <Grid.Col span={{ base: 6, sm: 6, md: 3 }}>
            <Title order={4}>Quick Links</Title>
            <List mt="sm" spacing="xs">
              <List.Item><Anchor component={Link} href="/">Home</Anchor></List.Item>
              <List.Item><Anchor component={Link} href="/menu">Menu</Anchor></List.Item>
              <List.Item><Anchor component={Link} href="/about">About Us</Anchor></List.Item>
              <List.Item><Anchor component={Link} href="/contact">Contact</Anchor></List.Item>
              <List.Item><Anchor component={Link} href="/reservations">Reservations</Anchor></List.Item>
            </List>
          </Grid.Col>

          {/* Contact */}
          <Grid.Col span={{ base: 6, sm: 6, md: 3 }}>
            <Title order={4}>Contact</Title>
            <List mt="sm" spacing="xs">
              <List.Item>📍 Nayabazar, Kathmandu</List.Item>
              <List.Item>📞 +977-9841449298</List.Item>
              <List.Item>✉️ info@restroland.com</List.Item>
            </List>
          </Grid.Col>

          {/* Hours */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={4}>Opening Hours</Title>
            <List mt="sm" spacing="xs">
              <List.Item>Mon - Fri: 10:00 AM – 10:00 PM</List.Item>
              <List.Item>Sat: 11:00 AM – 11:30 PM</List.Item>
              <List.Item>Sun: 11:00 AM – 9:00 PM</List.Item>
            </List>
          </Grid.Col>

        </Grid>
      </Container>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #333", marginTop: 30 }}>
        <Container size="lg" py="md">
          <Group justify="space-between">
            <Text size="sm">
              © {new Date().getFullYear()} RestroLand. All rights reserved.
            </Text>
          </Group>
        </Container>
      </div>
    </footer>
  );  
}