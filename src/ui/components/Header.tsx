import { Heading } from "@chakra-ui/react";


export default function Header() {
    return (
        <header>
            <Heading as="h3" size="lg" textAlign="center" my={4}>
                A Playground Project for Next.js   
            </Heading>
            <Heading as="h1" size="2xl" textAlign="center" my={2}>
                My NextJS Blog
            </Heading>
        </header>
    )
}
