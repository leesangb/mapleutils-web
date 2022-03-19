import { NextApiRequest, NextApiResponse } from 'next';
import { getViewsAndUsers } from '@api/analytics';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug as string;
    try {
        const analytics = await getViewsAndUsers(slug);
        return res.status(200).json(analytics);
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}