import styled from 'styled-components';

export const BoardContainerS = styled.div`
display: grid;
grid-template-rows: repeat(20, calc(25vw / 10));
grid-template-columns: repeat(10, 1fr);
grid-gap: 1px;
border: 2px solid yellow;
width: 100vw;
max-width: 25vw;

`;
export const BoardContainerCube = styled.div`
border: 1px solid black;
`

export const Div = styled.section`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;

`
