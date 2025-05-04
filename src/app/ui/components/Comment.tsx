"use client";

import {
  Avatar,
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  Menu,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { useState, useTransition, useOptimistic, useMemo } from "react";
import { FaEllipsis, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { toggleReactionAction } from "@/actions/reactions";
import { useSession } from "next-auth/react";

import { deleteComment } from "@/actions/comments";
import type { Comment, Reaction, User } from "@/generated/prisma";

interface CommentProps {
  comment: Comment & { reactions: Reaction[]};
  isOwner: boolean;
  owner: User;
}

const Comment: React.FC<CommentProps> = ({ comment, isOwner, owner }) => {
  const { data: session } = useSession();
  const [showMore, setShowMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const userReaction = useMemo(() => {
    return session?.user
      ? comment.reactions.find(
          (reaction) => reaction.userId === session.user!.id
        )?.type || null
      : null;
  }, [comment.reactions, session?.user]);
  const [optimisticReaction, setOptimisticReaction] =
    useOptimistic(userReaction);

  const toggleShowMore = () => setShowMore(!showMore);

  const handleDelete = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("commentId", comment.id);
      formData.append("postId", comment.postId);

      deleteComment(null, formData);
    });
  };

  const handleReaction = (type: "LIKE" | "DISLIKE") => {
    if (!session?.user) return;

    const newReaction = optimisticReaction === type ? null : type;
    setOptimisticReaction(newReaction);

    try {
      toggleReactionAction((session.user as User).id, comment.id, newReaction);
    } catch (error) {
      console.error("Error toggling reaction:", error);
      setOptimisticReaction(userReaction);
    }
  };

  const contentLines = comment.content.split("\n");
  const isContentLong = contentLines.length > 3;

  return (
    <Box p={4} mb={4}>
      <Flex>
        <Box mr={4}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={owner.name} />
          </Avatar.Root>
        </Box>
        <Flex direction="column" flex="1">
          <Flex alignItems="center" mb={2}>
            <Text fontWeight="bold" mr={2}>
              {owner.name}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </Text>
          </Flex>
          <Box mb={2}>
            {isContentLong && !showMore ? (
              <>
                {contentLines.slice(0, 3).map((line, index) => (
                  <Text key={index}>{line}</Text>
                ))}
                <Text
                  as="button"
                  color="blue.500"
                  fontSize="sm"
                  onClick={toggleShowMore}
                  mt={1}
                >
                  Show more
                </Text>
              </>
            ) : (
              <>
                {contentLines.map((line, index) => (
                  <Text key={index}>{line}</Text>
                ))}
                {isContentLong && (
                  <Text
                    as="button"
                    color="blue.500"
                    fontSize="sm"
                    onClick={toggleShowMore}
                    mt={1}
                  >
                    Show less
                  </Text>
                )}
              </>
            )}
          </Box>
          <Flex justifyContent="flex-start" gap={3}>
            <Flex alignItems="center" gap="1">
              <IconButton
                variant="ghost"
                size="sm"
                colorPalette={optimisticReaction === "LIKE" ? "purple" : "gray"}
                aria-label="Like"
                onClick={() => handleReaction("LIKE")}
              >
                <Icon
                  color={optimisticReaction === "LIKE" ? "#6601ea" : "gray"}
                >
                  <FaThumbsUp />
                </Icon>
              </IconButton>
              <Text fontSize="sm" color="gray.500">
                {comment.reactions.filter(
                  (reaction) => reaction.type === "LIKE"
                ).length}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="1">
              <IconButton
                variant="ghost"
                size="sm"
                colorPalette={optimisticReaction === "DISLIKE" ? "red" : "gray"}
                aria-label="Dislike"
                onClick={() => handleReaction("DISLIKE")}
              >
                <Icon color={optimisticReaction === "DISLIKE" ? "red" : "gray"}>
                  <FaThumbsDown />
                </Icon>
              </IconButton>
              <Text fontSize="sm" color="gray.500">
                {comment.reactions.filter(
                  (reaction) => reaction.type === "DISLIKE"
                ).length}
              </Text>
            </Flex>
            {isOwner && (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <IconButton colorPalette="gray" size="sm" aria-label="More">
                    <FaEllipsis />
                  </IconButton>
                </Menu.Trigger>
                <Menu.Content>
                  <Menu.Item
                    value="delete"
                    onSelect={handleDelete}
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    disabled={isPending}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu.Root>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Comment;
