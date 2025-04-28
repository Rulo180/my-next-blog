"use client";

import { Container, Flex, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

import LoginForm from "@/app/ui/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Container centerContent bgColor="gray.100" py="8">
      <Suspense
        fallback={
          <Flex justify="center" align="center" height="100%">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        }
      >
        <LoginForm />
      </Suspense>
    </Container>
  );
};

export default LoginPage;
