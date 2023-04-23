import { NextApiRequest, NextApiResponse } from 'next';
import { getWachanFarms } from '../../src/api/wachan';

const getFarms = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.name || typeof req.query.name !== 'string') {
            return;
        }
        const farms = await getWachanFarms(req.query.name);
        res.status(200).json(farms);
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
};

export default getFarms;
