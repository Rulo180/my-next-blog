"use client";

import { useActionState } from "react";
import { Field, Heading, Text, Textarea, Button, Box } from "@chakra-ui/react";

import { saveComment } from "@/app/lib/actions";
import { usePathname } from "next/navigation";

const CommentForm: React.FC = () => {
  const pathname = usePathname();
  const postId = pathname?.split("/").filter(Boolean).pop();
  const [, formAction, isPending] = useActionState(saveComment, null);
  return (
    <form action={formAction}>
      <Heading as="h3">Join the conversation</Heading>
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
      <input type="hidden" name="postId" value={postId} />
      <Box mt="4">
        <Button type="submit" colorPalette="blue">
            Enviar
        </Button>
      </Box>
    </form>
  );
};

export default CommentForm;
