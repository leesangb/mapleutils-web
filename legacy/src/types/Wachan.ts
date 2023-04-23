export interface WachanFarm {
    id: number;
    name: string;
    expiryDate: Date | null;
    upVote: number;
    downVote: number;
}

/**
 * [name, date, id, up, down]
 */
export type WachanFarmItem = [string, string | null, string, string | null, string | null];

export interface WachanResponse {
    monster_name: string;
    farm_list: WachanFarmItem[];
    error: boolean;
}