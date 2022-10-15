import { WachanFarm, WachanFarmItem } from '@@types/Wachan';

export const toWachanFarm = (item: WachanFarmItem): WachanFarm => {
    const [name, date, id, up, down] = item;
    return {
        name,
        id: parseInt(id),
        expiryDate: date ? new Date(date) : null,
        upVote: !up ? 0 : parseInt(up),
        downVote: !down ? 0 : parseInt(down),
    };
};

const byVoteDesc = (a: WachanFarm, b: WachanFarm): number => {
    return (b.upVote - b.downVote) - (a.upVote - a.downVote);
};

export const sortFarms = (farms: WachanFarm[]): WachanFarm[] => {
    const infinite = farms
        .filter(farm => farm.expiryDate === null)
        .sort(byVoteDesc);
    const notInfinite = farms
        .filter(farm => farm.expiryDate !== null)
        .sort(byVoteDesc);
    return infinite.concat(notInfinite);
};