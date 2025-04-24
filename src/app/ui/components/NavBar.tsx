"use client";

import { useState } from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  label: string;
};

function NavLink({ href, label }: NavLinkProps) {
  return (
    <Link href={href}>
      <Box w="165px" h="50px" borderLeft="1px solid">
        <Text
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          _hover={{ color: 'rgb(102, 0, 234)' }}
        >
          {label}
        </Text>
      </Box>
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box as="nav" px={4} borderY={"1px solid"} borderColor="black">
      <Flex justify="center" align="center" maxW="container.lg" mx="auto">
        <Flex display={{ base: "none", md: "flex" }} borderRight="1px solid">
          <NavLink href="/" label="Home" />
          <NavLink href="/saved" label="Saved" />
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