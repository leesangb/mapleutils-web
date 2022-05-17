import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import NextImage from 'next/image';
import { useTranslation } from 'next-i18next';

const helpMessageKeys = [
    'help.1',
    'help.2',
    'help.3',
];

const CaptureHelp = () => {
    const { t } = useTranslation('seed48');
    return (
        <Box>
            <Typography align='center' variant='h5' component={'div'} gutterBottom>
                {t('help.title')}
            </Typography>
            {helpMessageKeys.map((m, i) => (
                <Typography key={i}>
                    {i + 1}. {t(m)}
                </Typography>
            ))}
            <NextImage src={'/images/48_example.png'} alt='예제' width={257} height={158} />
        </Box>
    );
};

export default memo(CaptureHelp);