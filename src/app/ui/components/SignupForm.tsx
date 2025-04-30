"use client";

import {
  Button,
  Field,
  Flex,
  Heading,
  Icon,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import Link from "next/link";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";

import { registerUser } from "@/app/lib/actions";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let error = null;
    try {
      error = await registerUser(formData);
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register. Please try again.");
    }

    if (!error) {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        await signIn("credentials", {
          email,
          password,
          callbackUrl,
        })
      } catch (error) {
        console.error("Error during sign-in:", error);
        setError("Failed to sign in. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        pb={4}
        pt={8}
        px={6}
        borderRadius="lg"
        border="2px solid"
        borderColor="gray.300"
        width="sm"
        backgroundColor="white"
      >
        <Heading as="h1" size="4xl">
          Sign Up
        </Heading>
        <Text fontSize="xl">Create your account</Text>
        <Flex direction="column" gap={4} mt="8">
          <Field.Root>
            <Field.Label htmlFor="name">Name</Field.Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor="email">Email</Field.Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </Field.Root>
          <Field.Root>
            <Field.Label htmlFor="password">Password</Field.Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </Field.Root>
        </Flex>
        <Button
          type="submit"
          mt="4"
          w="full"
          colorPalette="blue"
          fontSize="lg"
        >
          Sign Up
        </Button>
        {error && (
          <Flex
            h="8"
            alignItems="flex-end"
            aria-live="polite"
            aria-atomic="true"
            gap="2"
          >
            <Icon h="5" w="5" color="red.500">
              <FaCircleExclamation />
            </Icon>
            <Text fontSize="sm" color="red.500">
              {error}
            </Text>
          </Flex>
        )}
        <Text color="gray.800" fontSize="sm" textAlign="center" mt="4">
          Already have an account?{" "}
          <ChakraLink asChild fontWeight="bold" color="gray.800">
            <Link href="/login">Log in!</Link>
          </ChakraLink>
        </Text>
      </Flex>
    </form>
  );
}
