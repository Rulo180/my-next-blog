import { Container, Flex, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

import SignUpForm from "@/app/ui/components/SignupForm";

const SignupPage: React.FC = async () => {
  return (
    <Container centerContent bgColor="gray.100" py="8">
      <Suspense
        fallback={
          <Flex justify="center" align="center" height="100%">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        }
      >
        <SignUpForm />
      </Suspense>
    </Container>
  );
};

export default SignupPage;
