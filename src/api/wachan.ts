import { WachanFarm, WachanResponse } from '@@types/Wachan';
import { sortFarms, toWachanFarm } from '@tools/wachanHelper';

const WACHAN_API_URL: string = 'http://wachan.me'

export const getWachanFarms = async (name: string): Promise<WachanFarm[]> => {
    const formData: Record<string, string> = {
        monster: name,
    };
    try {
        const response = await fetch(`${WACHAN_API_URL}/farm_read2.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData),
        });

        const farmResponse: WachanResponse = await response.json();

        const farmArray = farmResponse.farm_list
            .map(toWachanFarm)
            .filter(farm => farm.upVote - farm.downVote >= 0);

        return sortFarms(farmArray);
    } catch (e) {
        console.error(e);
    }
    return [];
}