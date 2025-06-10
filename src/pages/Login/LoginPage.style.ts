import styled from '@emotion/styled';
import { theme } from '@styles/theme';

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

export const Button = styled.button<{ bgColor?: string; textColor?: string }>`
  position: relative;
  width: 250px;
  padding: 12px;
  margin: 8px 0;
  background-color: ${({ bgColor }) => bgColor || theme.color.label.inverse};
  color: ${({ textColor }) => textColor || theme.color.label.normal};
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

export const RecentLoginBadge = styled.span`
  position: absolute;
  top: -12px;
  left: 12px;
  background: ${theme.color.label.normal};
  color: ${theme.color.label.inverse};
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 10px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid black;
  }
`;
