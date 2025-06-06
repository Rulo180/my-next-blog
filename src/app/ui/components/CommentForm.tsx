"use client";

import { useActionState } from "react";
import {
  Box,
  Button,
  Link as ChakraLink,
  Field,
  Flex,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import type { Post } from "@/generated/prisma";
import { saveComment } from "@/actions/comments";

interface CommentFormProps {
  post: Post;
}

const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
  const { data: session } = useSession();
  const [errors, formAction, isPending] = useActionState(saveComment, null);

  return (
    <form action={formAction}>
      <Heading as="h2">Join the conversation</Heading>
      <Text fontSize="lg" pb="4">
        Leave a comment below
      </Text>
      <Field.Root>
        <Field.Label>Comment:</Field.Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Enter your comment"
          rows={5}
          disabled={isPending || !session}
        />
      </Field.Root>
      <Box minHeight="24px" mt="2">
        {errors && typeof errors === "string" && (
          <Text color="red.500">{errors}</Text>
        )}
      </Box>
      <input type="hidden" name="postId" value={post.id} />
      <Flex mt="4" justifyContent={session ? 'flex-end' : 'space-between'} alignItems="center">
        {!session && (
          <Text>
            <ChakraLink asChild color="primary">
              <Link href={`/login?callbackUrl=/blog/${post.slug}`}>Log in</Link>
            </ChakraLink>
            {" "}or{" "}
            <ChakraLink asChild color="primary">
              <Link href={`/signup?callbackUrl=/blog/${post.slug}`}>sign up</Link>
            </ChakraLink>{" "}
            to publish a comment
          </Text>
        )}
        <Button
          type="submit"
          colorPalette="purple"
          variant="solid"
          disabled={!session}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
