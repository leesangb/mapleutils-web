import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const currentYear = new Date().getFullYear();

const StyledFooter = styled('footer')(({ theme }) => ({
    whiteSpace: 'initial',
    color: theme.palette.grey[600],
    margin: theme.spacing(1),
}));

interface FooterProps {
    open?: boolean;
}

const Footer = (props: FooterProps) => {
    return (
        <StyledFooter>
            {
                props.open
                    ? (
                        <Typography variant={'caption'}>
                            © {currentYear} mapleutils All rights reserved. mapleutils is not associated
                            with NEXON Korea.
                        </Typography>
                    ) : (
                        <Typography variant={'caption'}>
                            © {currentYear} mapleutils
                        </Typography>
                    )
            }

        </StyledFooter>
    );
};

export default Footer;