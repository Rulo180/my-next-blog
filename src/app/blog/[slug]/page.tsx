import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { getPost } from '@/lib/posts';
import Markdown from '@/ui/components/Markdown';
import Badge from '@/ui/components/Badge';
import Socials from '@/ui/components/Socials';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, data: { date, description, duration, imageUrl, tags, title } } = await getPost(params.slug);

  return (
    <Container py={8}>
      <Flex
        as="article"
        direction="column"
        gap="8"
        borderWidth="1px"
        borderColor="border.disabled"
        p={12}
      >
        <Box>
          <Flex justifyContent="flex-end" gap="2" fontSize="md" color="gray.500">
            <Text>{date}</Text>-<Text>{duration} minutes</Text>
          </Flex>
          <Heading size="5xl" pb="8">{title}</Heading>
        </Box>
        <Box>
          <Text fontSize="lg" pb="4">{description}</Text>
          <Image
            width={800}
            height={533}
            src={imageUrl}
            alt="Post image"
          />
          <Box mt={4}>
            <Markdown content={content} />
          </Box>
        </Box>
        <Flex direction="column" gap="6">
          <Flex gap="3" alignItems="center">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} />
            ))}
          </Flex>
          <Flex gap="5" alignItems="center">
            <Socials />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}