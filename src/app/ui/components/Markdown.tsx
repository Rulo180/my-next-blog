import ReactMarkdown from 'react-markdown';
import { Blockquote, Code, Heading, Text, Link as ChakraLink, List } from '@chakra-ui/react';
import Link from 'next/link';

interface MarkdownProps {
    content: string;
}

/**
 * A React component that renders Markdown content using `react-markdown` and Chakra UI components.
 * 
 * This component maps Markdown elements (e.g., headings, paragraphs, lists, blockquotes) to Chakra UI
 * components for consistent styling.
 * 
 * @component
 * @param {MarkdownProps} props - The props for the Markdown component.
 * @param {string} props.content - The Markdown content to render.
 * 
 * @example
 * ```tsx
 * import Markdown from './Markdown';
 * 
 * const markdownContent = `
 * # Heading 1
 * ## Heading 2
 * - List item 1
 * - List item 2
 * > Blockquote text
 * `;
 * 
 * <Markdown content={markdownContent} />;
 * ```
 */
const Markdown: React.FC<MarkdownProps> = ({ content }) => {
    return (
        <ReactMarkdown
              components={{
                h1: (props) => <Heading as="h1" size="2xl" mb={4} {...props} />,
                h2: (props) => <Heading as="h2" size="xl" mb={3} {...props} />,
                h3: (props) => <Heading as="h3" size="lg" mb={2} {...props} />,
                p: (props) => <Text fontSize="md" mb={2} {...props} />,
                ul: (props) => <List.Root pl={4} {...props} />,
                ol: (props) => <List.Root as="ol" pl={4} {...props} />,
                li: (props) => <List.Item pl={2} {...props} />,
                blockquote: (props) => (
                  <Blockquote.Root
                    pl={4}
                    borderLeft="4px solid"
                    borderColor="gray.300"
                    color="gray.600"
                    fontStyle="italic"
                    {...props}
                  />
                ),
                code: ({ children, ...props }) => (
                    <Code colorPalette="gray" size="md" mb="3" {...props}>
                      {children}
                    </Code>
                ),
                a: (props) => (
                  <ChakraLink asChild color="blue.500" textDecoration="underline"  >
                    <Link href={props.href || '#'} {...props} />
                  </ChakraLink>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
    );
};

export default Markdown;