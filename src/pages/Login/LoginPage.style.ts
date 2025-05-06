import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

export const Divider = styled.div`
  width: 250px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  line-height: 0.1em;
  margin: 30px 0 20px;

  span {
    background: #fff;
    padding: 0 10px;
    color: #888;
    font-size: 12px;
  }
`;

export const Button = styled.button<{ bgColor: string; textColor?: string }>`
  width: 250px;
  padding: 12px;
  margin: 8px 0;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor || '#000'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20%;

  &:hover {
    opacity: 0.9;
  }
`;
