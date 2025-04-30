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

import { saveComment } from "@/app/lib/actions";

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
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
      <input type="hidden" name="postId" value={postId} />
      <Flex mt="4" justifyContent={session ? 'flex-end' : 'space-between'} alignItems="center">
        {!session && (
          <Text>
            <ChakraLink asChild>
              <Link href={`/login?callbackUrl=/blog/${postId}`}>Log in</Link>
            </ChakraLink>{" "}
            to publish a comment
          </Text>
        )}
        <Button
          type="submit"
          colorPalette="gray"
          variant="surface"
          disabled={!session}
        >
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CommentForm;
