"use client";

import { useActionState } from "react";
import { Box, Button, Field, Heading, Text, Textarea } from "@chakra-ui/react";

import { saveComment } from "@/app/lib/actions";

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const [state, formAction, isPending] = useActionState(saveComment, null);

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
          disabled={isPending}
        />
      </Field.Root>
      <Box minHeight="24px" mt="2">
        {state && typeof state === "string" && (
          <Text color="red.500">{state}</Text>
        )}
      </Box>
      <input type="hidden" name="postId" value={postId} />
      <Box mt="4">
        <Button type="submit" colorPalette="gray" variant="surface">
          Enviar
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
