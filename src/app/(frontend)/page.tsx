"use client";

import { AppShell, Burger, Group, Box } from '@mantine/core';
import Navbar from './components/Header';
import Content from './components/Container';

export default function Home() {

  return (
    <AppShell style={{ backgroundColor: '#fff1d7', minHeight: '100vh' }}>
      {/* Top Navbar */}
      <Box>
        <Group justify="space-between">
          <Navbar />
        </Group>
      </Box>

      <Box>
        <Content />
      </Box>
    </AppShell>
  );
}