import styled from 'styled-components';
import { isProduction } from '@/utils/helper';
import { media } from '@/ds';
import AdSense from './AdSense';

export const AdRight = () => {
    return (
        <Container>
            {isProduction ? (<AdSense slot={'AdRight'} />) : 'adright'}
        </Container>
    );
};

const Container = styled.aside`
  grid-area: adr;
  position: fixed;
  top: calc(${({ theme }) => theme.appBar.height} + 100px);
  right: 16px;
  width: 160px;
  height: fit-content;
  border: ${isProduction ? 'none' : '1px solid red'};
  display: flex;
  justify-content: center;

  ${media.max('sm')} {
    display: none;
  }
`;
