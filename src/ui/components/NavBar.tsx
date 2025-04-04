"use client";

import { useState } from "react";
import { Box, Flex, IconButton, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box px={4} py={3} border={"1px solid"} borderColor="black">
      <Flex justify="space-between" align="center" maxW="container.lg" mx="auto">
        <Flex display={{ base: "none", md: "flex" }} gap={4}>
          <Link href="/">
            <Button>Home</Button>
          </Link>
          <Link href="/blog">
            <Button >Saved</Button>
          </Link>
        </Flex>

        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Toggle menu"
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {isOpen && (
        <Box display={{ base: "block", md: "none" }} mt={2} p={2} shadow="md">
          <Link href="/blog">
            <Button variant="ghost" w="full">Blog</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" w="full">About</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}