import { Button } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface LinkButtonProps {
    to: string;
    label: string;
    matches?: string[];
}

const LinkButton = (props: LinkButtonProps) => {
    const { to, label, matches } = props;
    const location = useRouter();
    const isMatching = matches ? matches.includes(location.pathname) : location.pathname.startsWith(to);

    return (
        <NextLink href={to}>
            <Button color={isMatching ? 'primary' : 'inherit'} size={'large'}>
                {label}
            </Button>
        </NextLink>
    );
};

export default LinkButton;
