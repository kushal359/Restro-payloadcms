'use client'
import { Container, Grid, GridCol,ListItem, Text, Title, List, Anchor, Group } from "@mantine/core";
import Link from "next/link";
import styles from "./style.module.css"

export default function Footer () {
  return(
    <footer className={styles.footer}>
      
      <Container size="lg">
        <Grid>

          {/* Brand */}
          <GridCol span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={3}>Restro Land</Title>
            <Text size="sm" mt="sm" c="dimmed">
              Serving delicious meals made with fresh ingredients. Experience taste like never before.
            </Text>
          </GridCol>

          {/* Navigation */}
          <GridCol span={{ base: 6, sm: 6, md: 3 }}>
            <Title order={4}>Quick Links</Title>
            <List mt="sm" spacing="xs">
              <ListItem><Anchor component={Link} href="/">Home</Anchor></ListItem>
              <ListItem><Anchor component={Link} href="/menu">Menu</Anchor></ListItem>
              <ListItem><Anchor component={Link} href="/about">About Us</Anchor></ListItem>
              <ListItem><Anchor component={Link} href="/contact">Contact</Anchor></ListItem>
              <ListItem><Anchor component={Link} href="/reservations">Reservations</Anchor></ListItem>
            </List>
          </GridCol>

          {/* Contact */}
          <GridCol span={{ base: 6, sm: 6, md: 3 }}>
            <Title order={4}>Contact</Title>
            <List mt="sm" spacing="xs">
              <ListItem>📍 Nayabazar, Kathmandu</ListItem>
              <ListItem>📞 +977-9841449298</ListItem>
              <ListItem>✉️ info@restroland.com</ListItem>
            </List>
          </GridCol>

          {/* Hours */}
          <GridCol span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={4}>Opening Hours</Title>
            <List mt="sm" spacing="xs">
              <ListItem>Mon - Fri: 10:00 AM – 10:00 PM</ListItem>
              <ListItem>Sat: 11:00 AM – 11:30 PM</ListItem>
              <ListItem>Sun: 11:00 AM – 9:00 PM</ListItem>
            </List>
          </GridCol>

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