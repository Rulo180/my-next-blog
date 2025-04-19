import { Link as ChakraLink, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

/**
 * Socials component to display social media links with icons.
 *
 * @returns {JSX.Element} The rendered Socials component.
 */
const Socials: React.FC = () => {
    return (
        <>
            <ChakraLink asChild>
              <Link href="https://www.linkedin.com/in/martin-valles-0370a8133/" target="_blank">
                <Icon size="lg" color="#0966c2">
                  <SiLinkedin />
                </Icon>
              </Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link href="https://https://github.com/rulo180" target="_blank">
                <Icon size="lg" color="black">
                  <SiGithub />
                </Icon>
              </Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link href="https://x.com/Rulo_Valles" target="_blank">
                <Icon size="lg" color="black">
                  <SiX />
                </Icon>
              </Link>
            </ChakraLink>
        </>
    );
};

export default Socials;