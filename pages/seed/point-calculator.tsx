import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Seo } from '@components/seo';
import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '@components/seo/useI18nSeoProps';
import { Comments } from '@components/comments';
import { I18nTitleCard } from '@components/card';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps,
    Card,
    CardContent,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { ACCUMULATED, FLOOR_POINTS } from '@data/seed/point';
import { Fragment } from 'react';
import { ArrowForwardIosSharp } from '@mui/icons-material';

interface PointCalculatorProps {
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const PointTable = ({ data }: { data: number[][] }) => {
    const { t } = useTranslation('pointCalculator');
    return <Table size={'small'}>
        <TableHead>
            <TableRow>
                <TableCell>타워인헨스 링</TableCell>
                <TableCell align={'right'}>{t('none')}</TableCell>
                <TableCell align={'right'}>{t('level', { level: 1 })}</TableCell>
                <TableCell align={'right'}>{t('level', { level: 2 })}</TableCell>
                <TableCell align={'right'}>{t('level', { level: 3 })}</TableCell>
                <TableCell align={'right'}>{t('level', { level: 4 })}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.slice(1).map((points, i) => {
                const floor = i + 1;
                const isShelter = floor.toString().endsWith('5');

                return <TableRow key={floor}
                                 sx={isShelter ? { backgroundColor: theme => theme.palette.background.default } : {}}>
                    <TableCell>
                        {t('floor', { floor })}
                    </TableCell>
                    {points.map((point, j) => <Fragment key={j}>
                        <TableCell align={'right'}>
                            {!isShelter && point}
                        </TableCell>
                    </Fragment>)}
                </TableRow>;
            })}
        </TableBody>
    </Table>;
};

const PointCalculator = ({}: PointCalculatorProps) => {
    const { t } = useTranslation('pointCalculator');
    const seoProps = useI18nSeoProps('pointCalculator');
    return (
        <>
            <Seo {...seoProps} image={'fixme'} />
            <I18nTitleCard ns={'pointCalculator'} />

            <Card variant={'outlined'}>
                <CardContent>

                    <Accordion variant={'outlined'}>
                        <AccordionSummary>
                            <Typography variant={'h3'}>
                                {t('floorPoints')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PointTable data={FLOOR_POINTS} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion variant={'outlined'} sx={{ marginTop: 1 }}>
                        <AccordionSummary>
                            <Typography variant={'h3'}>
                                {t('floorPointsAccumulated')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <PointTable data={ACCUMULATED} />
                        </AccordionDetails>
                    </Accordion>

                </CardContent>
            </Card>

            <Comments pageKey={'pointCalculator'} />
        </>
    );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'pointCalculator'])),
        },
    };
};

export default PointCalculator;
