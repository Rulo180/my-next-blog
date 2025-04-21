import { Flex, Heading, Text } from "@chakra-ui/react";


export default function Header() {
    return (
        <Flex as="header" p={6} direction="column" justifyContent="center" gap={3}>
            <Text as="h3" fontSize="2xl" textAlign="center">
                A Playground Project for Next.js   
            </Text>
            <Heading as="h1" size="6xl" textAlign="center">
                My NextJS Blog
            </Heading>
        </Flex>
    )
}
