"use client";

import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  Heading,
  Icon,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { useActionState } from "react";
import { FaArrowRight, FaCircleExclamation } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import { authenticate } from "@/actions/users";


export default function LoginForm() {
  const [checked, setChecked] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  function handlePasswordClick() {
   setChecked(!checked)
  }

  return (
    <form action={formAction}>
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
        <Box mb="8">
          <Heading as="h1" size="4xl">
            Login
          </Heading>
          <Text fontSize="xl">to join the conversation</Text>
        </Box>
        <Flex direction="column" gap={4}>
          <Field.Root>
            <Field.Label color="gray.800" fontSize="xs" htmlFor="email">
              Email
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              rounded="md"
              borderWidth="1px"
              borderColor="gray.500"
              fontSize="sm"
              _placeholder={{ color: "gray.500" }}
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label color="gray.800" fontSize="xs" htmlFor="password">
              Password
            </Field.Label>
            <Input
              rounded="md"
              borderWidth="1px"
              borderColor="gray.500"
              fontSize="sm"
              _placeholder={{ color: "gray.500" }}
              id="password"
              type={ checked ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
            <Box w="full" textAlign="right" mt="2">
              <Checkbox.Root checked={checked} onCheckedChange={handlePasswordClick}>
                <Checkbox.HiddenInput />
                <Checkbox.Control  border="1px solid" borderColor="gray.500" />
                <Checkbox.Label>Show password</Checkbox.Label>
              </Checkbox.Root>
            </Box>
          </Field.Root>
        </Flex>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          type="submit"
          mt="4"
          w="full"
          colorPalette="blue"
          fontSize="lg"
          aria-disabled={isPending}
        >
          <Flex alignItems="center" gap="2">
            Log in{" "}
            <Icon ml="auto" h="5" w="5" color="gray.50">
              <FaArrowRight />
            </Icon>
          </Flex>
        </Button>
        {errorMessage && (
          <Flex h="8" alignItems="flex-end" aria-live="polite" aria-atomic="true" gap="2">
            <Icon h="5" w="5" color="red.500">
              <FaCircleExclamation />
            </Icon>
            <Text fontSize="sm" color="red.500">
              {errorMessage}
            </Text>
          </Flex>
        )}
        <Text color="gray.800" fontSize="sm" textAlign="center" mt="4">
          Don&apos;t have an account?{" "}
          <ChakraLink asChild fontWeight="bold" color="gray.800">
            <Link href="/signup">Sign up now!</Link>
          </ChakraLink>
        </Text>
      </Flex>
    </form>
  );
}
