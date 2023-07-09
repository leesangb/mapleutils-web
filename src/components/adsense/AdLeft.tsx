import styled from 'styled-components';
import { isProduction } from '@/utils/helper';
import AdSense from './AdSense';

export const AdLeft = () => {
    return (
        <Container>
            {isProduction ? (<AdSense slot={'AdLeft'} />) : 'adleft'}
        </Container>
    );
};

const Container = styled.aside`
  grid-area: adl;
  position: fixed;
  top: calc(${({ theme }) => theme.appBar.height} + 16px);
  left: 16px;
  width: 160px;
  height: fit-content;
  border: ${isProduction ? 'none' : '1px solid red'};
  display: flex;
  justify-content: center;

  @media (width <= 1528px) {
    display: none;
  }
`;
