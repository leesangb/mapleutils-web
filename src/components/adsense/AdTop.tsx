import styled from 'styled-components';
import { isProduction } from '@/utils/helper';
import AdSense from './AdSense';

export const AdTop = () => {
    return (
        <Container>
            {isProduction ? (
                <AdSense slot={'AdTop'} />
            ) : 'adtop'}
        </Container>
    );
};

const Container = styled.aside`
  grid-area: adt;
  width: 100%;
  border: ${isProduction ? 'none' : '1px solid red'};
  display: flex;
  justify-content: center;
`;
