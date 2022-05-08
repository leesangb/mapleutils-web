import { NextApiRequest, NextApiResponse } from 'next';
import { getRealTimeData } from '@api/analytics';

const realtimeUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const analytics = await getRealTimeData();
        return res.status(200).json(analytics);
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
};

export default realtimeUsers;