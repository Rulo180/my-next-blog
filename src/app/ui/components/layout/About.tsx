import {
  Flex,
  Heading,
  Image as ChakraImage,
  Separator,
  Stack,
  Text,
  Mark,
} from "@chakra-ui/react";
import Image from "next/image";

import Socials from "@/app/ui/components/Socials";

export default function About() {
  return (
    <Stack
      direction="column"
      gap="8"
      px="16"
      borderLeft={{ lgDown: "0", lg: "1px solid" }}
      borderColor="black"
      ml={{ lgDown: "0", lg: "6" }}
      separator={<Separator orientation="horizontal" /> }
    >
      <Stack gap="10">
        <Heading as="h2" fontSize="3xl">
          About me
        </Heading>
        <ChakraImage asChild>
          <Image
            src="/images/profile-picture.jpg"
            alt="Profile picture"
            width={1200}
            height={950}
          />
        </ChakraImage>
        <Stack gap="4">
          <Text>
            I am a <Mark variant="solid" colorPalette="purple">frontend developer</Mark> with over 10 years of experience building
            high-quality web applications.
          </Text>
          <Text>
            I pay close attention to both visual and coding details,
            prioritizing performance, scalability, and best practices.
          </Text>
          <Text>
            Recently, I’ve been exploring backend technologies like <Mark variant="solid" colorPalette="purple">Next.js</Mark> to
            expand my skill set and strengthen my full-stack capabilities.
          </Text>
        </Stack>
      </Stack>
      <Stack gap="10">
        <Heading as="h2" fontSize="3xl">
          Contact me
        </Heading>
        <Text>
          If you’re looking for a developer who combines technical expertise
          with a passion for detail, I’d love to bring my skills to your team.
        </Text>
      </Stack>
      <Flex gap="4" justifyContent="center">
        <Socials />
      </Flex>
    </Stack>
  );
}
