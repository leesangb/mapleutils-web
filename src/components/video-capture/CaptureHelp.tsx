import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import NextImage from 'next/image';

const guideMessages = [
    '메이플스토리 클라이언트를 창모드로 해주세요',
    '\'화면 공유하기\' - \'애플리케이션 창\'에서 메이플스토리를 선택 한 뒤 \'화면공유\'를 눌러주세요',
    '필요 시 아래와 같이 위치 세부 조정을 해주세요',
];

const CaptureHelp = () => {
    return (
        <Box>
            <Typography align='center' variant='h5' component={'div'} gutterBottom>
                ※ 공유되는 화면은 어떠한 경우에도 서버로 전송 되지 않고 브라우저에 출력하는
                용도로만 사용됩니다 ※
            </Typography>
            {guideMessages.map((m, i) => (
                <Typography key={i}>
                    {i + 1}. {m}
                </Typography>
            ))}
            <NextImage src={'/images/48_example.png'} alt='예제' width={257} height={158} />
        </Box>
    );
};

export default memo(CaptureHelp);