"use client";

import {
  Avatar,
  Button,
  Menu,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const COLOR_PALETTE = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
};

const UserAvatar: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="ghost" p={0}>
          <Avatar.Root bg={`${pickPalette(name)}.500`} shape="rounded">
            <Avatar.Fallback name={name} />
          </Avatar.Root>
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="logout-a" onSelect={() => signOut()}>
            Logout
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default UserAvatar;
