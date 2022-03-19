import { BetaAnalyticsDataClient } from '@google-analytics/data';

interface OldUrls {
    old: string;
    new: string;
}

const oldUrls: OldUrls[] = [
    {
        old: '/monster-life/information',
        new: '/farm/info',
    },
    {
        old: '/monster-life/combine',
        new: '/farm/combine',
    },
];

export interface AnalyticsRealTimeData {
    users: number;
}

export interface AnalyticsData {
    users: number;
    views: number;
}

export async function getRealTimeData(): Promise<AnalyticsRealTimeData | null> {
    const analyticsDataClient = new BetaAnalyticsDataClient(
        {
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            },
        },
    );
    const [response] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
        dimensions: [
            {
                name: 'minutesAgo',
            },
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'minutesAgo',
                inListFilter: {
                    values: ['00', '01'],
                },
            },
        },
        metrics: [
            {
                name: 'activeUsers',
            },
        ],
    });

    if (response && response.rows && response.rowCount) {
        return response.rows.reduce((acc, metrics) => ({
            users: acc.users + parseInt(metrics.metricValues![0].value!),
        }), { users: 0 });
    }

    return null;
}

export async function getViewsAndUsers(slug: string, startDate: string = '2021-08-14', endDate: string = 'today'): Promise<AnalyticsData | null> {
    const analyticsDataClient = new BetaAnalyticsDataClient(
        {
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_CLIENT_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            },
        },
    );
    const slugs = [slug];
    const oldUrl = oldUrls.find(urls => urls.new === slug);
    if (oldUrl) {
        slugs.push(oldUrl.old);
    }
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${process.env.GOOGLE_ANALYTICS_VIEW_ID}`,
        dateRanges: [
            {
                startDate,
                endDate,
            },
        ],
        dimensions: [
            {
                name: 'pagePath',
            },
        ],
        dimensionFilter: {
            filter: {
                fieldName: 'pagePath',
                inListFilter: {
                    values: slugs,
                },

            },
        },
        metrics: [
            {
                name: 'screenPageViews',
            },
            {
                name: 'totalUsers',
            },
        ],
    });
    if (response && response.rows && response.rowCount) {
        return response.rows.map(r => ({
            views: r!.metricValues![0].value!,
            users: r!.metricValues![1].value!,
        })).reduce((acc, { views, users }) => ({
            views: acc.views + parseInt(views),
            users: acc.users + parseInt(users),
        }), { views: 0, users: 0 });
    }
    return null;
}
