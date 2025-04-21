import { Badge as ChakraBadge } from "@chakra-ui/react";

type BadgeProps = {
    label: string;
};

/**
 * Badge component to display a label with styling.
 *
 * @param {BadgeProps} props - The props for the Badge component.
 * @param {string} props.label - The label to be displayed on the tag.
 * @returns {JSX.Element} The rendered Tag component.
 */
const Badge: React.FC<BadgeProps> = ({ label }) => {
    return (
        <ChakraBadge
            key={label}
            fontSize="md"
            px="2"
            py="1"
            borderRadius="full"
            textTransform="capitalize"
            fontWeight="bold"
            >
            {label}
        </ChakraBadge>
    );
};

export default Badge;