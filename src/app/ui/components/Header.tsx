import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import Link from "next/link";

import { auth } from "@/auth";
import UserAvatar from "@/app/ui/components/UserAvatar";

export default async function Header() {
  const session = await auth();
  return (
    <Flex as="header" p={6} direction="column" justifyContent="center" gap={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex="1" textAlign="center" pl="20px">
          <Text as="h3" fontSize="2xl">
            A Playground Project for Next.js
          </Text>
        </Box>
        {session?.user && (
          <UserAvatar name={session.user.name || "User"} />
        )}
        {!session?.user && <Link href="/login">Login</Link>}
      </Flex>
      <Heading as="h1" size="6xl" textAlign="center">
        My NextJS Blog
      </Heading>
    </Flex>
  );
}
