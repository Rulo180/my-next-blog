"use client";

import { IconButton } from "@chakra-ui/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useState } from "react";
import { savePostAction } from "@/actions/posts";

interface SaveButtonProps {
  postId: string;
  isSaved: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  postId,
  isSaved: initialSaved,
}) => {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handleSavePost = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await savePostAction(postId);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <IconButton
      aria-label="Save post"
      onClick={handleSavePost}
      variant="ghost"
      color="gray.600"
      _hover={{ color: "white" }}
    >
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
    </IconButton>
  );
};

export default SaveButton;
