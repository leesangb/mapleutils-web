import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Seo } from '../../src/components/seo';
import { useTranslation } from 'next-i18next';
import useI18nSeoProps from '../../src/components/seo/useI18nSeoProps';
import { Comments } from '../../src/components/comments';
import { I18nTitleCard } from '../../src/components/card';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    AccordionSummaryProps,
    Card,
    CardContent,
    darken,
    Grid,
    lighten,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { ACCUMULATED, ENHANCED_FLOORS, FLOOR_POINTS } from '@data/seed/point';
import { Fragment, useState } from 'react';
import { ArrowForwardIosSharp } from '@mui/icons-material';
import NumberTextField from '../../src/components/input/NumberTextField';
import { formatNumberComma } from '../../src/tools/string';

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
                <TableCell>{t('towerEnhanceRing')}</TableCell>
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
                const isBoostedFloor = ENHANCED_FLOORS.includes(floor);

                return <TableRow key={floor}
                                 sx={isShelter
                                     ? { backgroundColor: theme => theme.palette.background.default }
                                     : isBoostedFloor
                                         ? {
                                             backgroundColor: theme => theme.palette.mode === 'dark'
                                                 ? darken(theme.palette.primary.dark, 0.5)
                                                 : lighten(theme.palette.primary.light, 0.5),
                                         }
                                         : {}}>
                    <TableCell>
                        {t('floor', { floor })}
                    </TableCell>
                    {points.map((point, j) => <Fragment key={j}>
                        <TableCell align={'right'}>
                            {!isShelter && formatNumberComma(point)}
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

    const [currentPoint, setCurrentPoint] = useState<string>('');
    const [targetPoint, setTargetPoint] = useState<string>('');

    const [n, setN] = useState<string>('');

    return (
        <>
            <Seo {...seoProps} image={'fixme'} />
            <I18nTitleCard ns={'pointCalculator'} />

            <Card variant={'outlined'}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                            <Typography variant={'h4'} gutterBottom>
                                {t('howManyRuns')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <NumberTextField value={targetPoint}
                                             fullWidth
                                             label={t('targetPoint')}
                                             size={'small'}
                                             onChange={e => setTargetPoint(e.target.value)} />
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <NumberTextField value={currentPoint}
                                             fullWidth
                                             label={t('currentPoint')}
                                             size={'small'}
                                             onChange={e => setCurrentPoint(e.target.value)} />
                        </Grid>
                        <Grid item xs={4} sm={3}>
                            <NumberTextField
                                value={formatNumberComma(Math.max(Number(targetPoint) - Number(currentPoint), 0))}
                                disabled
                                size={'small'}
                                fullWidth
                                label={t('pointLeft')} />
                        </Grid>
                        <Grid item xs={12}>
                            <Table size={'small'} sx={{ marginBottom: 2 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('towerEnhanceRing')}</TableCell>
                                        <TableCell align={'right'}>{t('none')}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 1 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 2 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 3 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 4 })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[41, 46, 47, 50].map(floor => <TableRow key={floor}>
                                        <TableCell>
                                            {t('floor', { floor })}
                                        </TableCell>
                                        {ACCUMULATED[floor].map((acc, i) => <TableCell key={i} align={'right'}>
                                            {t('atMost')} {formatNumberComma(
                                            Math.max(
                                                Math.ceil((Number(targetPoint) - Number(currentPoint)) / acc),
                                                0),
                                        )}{t('run')}
                                        </TableCell>)}
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant={'h4'} gutterBottom>
                                {t('howManyPoints')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <NumberTextField value={n}
                                             fullWidth
                                             label={t('runCount')}
                                             size={'small'}
                                             onChange={e => setN(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Table size={'small'} sx={{ marginBottom: 2 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('towerEnhanceRing')}</TableCell>
                                        <TableCell align={'right'}>{t('none')}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 1 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 2 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 3 })}</TableCell>
                                        <TableCell align={'right'}>{t('level', { level: 4 })}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {[41, 46, 47, 50].map(floor => <TableRow key={floor}>
                                        <TableCell>
                                            {t('floor', { floor })}
                                        </TableCell>
                                        {ACCUMULATED[floor].map((acc, i) => <TableCell key={i} align={'right'}>
                                            <Typography variant={'body2'}>
                                                {formatNumberComma(acc * Number(n))}
                                            </Typography>
                                            <Typography variant={'caption'}>
                                                + α
                                            </Typography>
                                        </TableCell>)}
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>


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
