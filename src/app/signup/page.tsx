import SignUpForm from '@/app/ui/components/SignupForm';
import { Container } from '@chakra-ui/react';

const SignupPage: React.FC = async () => {
    return (
        <Container centerContent bgColor="gray.100" py="8">
            <SignUpForm />
        </Container>
    );
};

export default SignupPage;