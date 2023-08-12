import { MonsterLifeMob } from '@/data/farm/mobs';
import { Modal } from '@/ds/surfaces';
import { Button } from '@/ds/inputs';
import { RiFileCopy2Fill, RiSearch2Line, RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri';
import { useState } from 'react';
import { WachanFarm } from '@/types/Wachan';
import styled from 'styled-components';
import { Typography } from '@/ds/displays';
import { copy } from '@/utils/clipboard';
import { toast } from 'react-toastify';
import { getMesoKrUrl } from '@/utils/string';
import { useWindowPopupContext } from '@/components/popup/useWindowPopupContext';
import { useQuery } from '@tanstack/react-query';

interface MobFarmModalProps {
    mob: MonsterLifeMob;
    onClose: () => void;
}

const TRAILING_NOT_VALID_LETTERS = /^([ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+).*$/;

const getMob = async (name: string) => {
    const result = await fetch(`/api/wachan?name=${encodeURI(name)}`);
    if (!result.ok) {
        throw new Error('Failed to fetch');
    }
    const json = await result.json();
    return json as WachanFarm[];
};

export const MobFarmModal = ({ mob, onClose }: MobFarmModalProps) => {
    const { openPopup } = useWindowPopupContext();
    const {data: farms, isLoading} = useQuery({
        queryKey: ['mob', mob.name],
        queryFn: () => getMob(mob.name),
        initialData: [],
    });

    return (
        <Modal title={`${mob.name} - 소유 농장`} onClose={onClose}>
            <Modal.Content style={{ width: '600px' }}>
                <Button onClick={e => {
                    if (window.matchMedia('(width <= 600px)').matches) {
                        return;
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    openPopup(getMesoKrUrl(mob.name));
                }} href={getMesoKrUrl(mob.name)} target={'_blank'}>
                    <RiSearch2Line /> meso.kr에서 <b>{mob.name}</b> 검색
                </Button>
                <hr />
                {isLoading ? (<></>) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell />
                                <TableHeadCell>농장</TableHeadCell>
                                <TableHeadCell>기간</TableHeadCell>
                                <TableHeadCell>정확한 정보입니까?</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {farms.map((farm) => (
                                <TableRow key={farm.id}>
                                    <TableCell>
                                        <CopyButton text={farm.name.replace(TRAILING_NOT_VALID_LETTERS, (a, b) => b)} />
                                    </TableCell>
                                    <TableCell>
                                        {farm.name}
                                    </TableCell>
                                    <TableCell>
                                        {farm.expiryDate ? new Date(farm.expiryDate).toLocaleDateString('ko-KR', {
                                            year: '2-digit',
                                            month: 'long',
                                            day: '2-digit',
                                        }) : '무한'}
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            <Text>
                                                {farm.upVote - farm.downVote}
                                            </Text>
                                            <Text fontSize={12}>
                                                (<RiThumbUpFill />{farm.upVote} / <RiThumbDownFill />{farm.downVote})
                                            </Text>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
                }
            </Modal.Content>
        </Modal>
    );
};

const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    return (
        <Button active={copied} onClick={() => copy(text).then(() => {
            toast.success(`<${text}>을(를) 복사했습니다!`);
            setCopied(true);
        })}>
            <RiFileCopy2Fill />
            {copied ? '다시복사' : '복사하기'}
        </Button>
    );
};

const Table = styled.table`
  display: table;
  table-layout: auto;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.contour};
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-align: left;
`;

const TableBody = styled.tbody`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.contour};
`;

const TableHeadCell = styled.th`
  padding: 8px;
`;
const TableCell = styled.td`
  padding: 8px;
  font-size: 14px;
  font-weight: normal;
`;

const Text = styled(Typography)`
  display: flex;
  align-items: center;
`;
