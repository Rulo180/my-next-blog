import { Flex, Heading, Text } from "@chakra-ui/react";

import { auth } from "@/auth";
import UserAvatar from "@/app/ui/components/UserAvatar";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <Flex as="header" p={6} direction="column" justifyContent="center" gap={3}>
      <Flex justifyContent="space-between">
        <Text as="h3" fontSize="2xl" textAlign="center">
          A Playground Project for Next.js
        </Text>
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
