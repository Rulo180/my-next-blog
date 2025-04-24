import { Container } from "@chakra-ui/react";

import LoginForm from "@/app/ui/components/LoginForm";

const LoginPage: React.FC = async () => {
    return (
        <Container centerContent bgColor="gray.100" py="8">
            <LoginForm />
        </Container>
    );
};

export default LoginPage;