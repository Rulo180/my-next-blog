import { Container, Flex, Text } from "@chakra-ui/react";

import Socials from "@/app/ui/components/Socials";

export default function Footer() {
  return (
    <Container fluid as="footer" fontSize="sm" backgroundColor="gray.200">
      <Flex justifyContent="space-between" alignItems="center" py={4}>
        <Flex justifyContent="center" gap={4}>
          <Socials />
        </Flex>
        <Text>© 2025 by Martin Valles</Text>
      </Flex>
    </Container>
  );
}
