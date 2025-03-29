import { MessageItem, MessageBody, MessageHeader, Title, Time, Content, Dot, HeaderLeft } from './SideMessage.Style';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
interface SideMessageItemProps {
  color: string; // 말풍선 앞 점 색상
  title: string;
  content: string;
  time: string;
  isPinned?: boolean;
}

const SideMessage = ({ color, title, content, time, isPinned }: SideMessageItemProps) => {
  return (
    <MessageItem>
      <Dot style={{ backgroundColor: color }} />
      <MessageBody>
        <MessageHeader>
          <HeaderLeft>
            <Title>{title}</Title>
            {isPinned && <PinSVG />}
          </HeaderLeft>
          <Time>{time}</Time>
        </MessageHeader>
        <Content>{content}</Content>
      </MessageBody>
    </MessageItem>
  );
};

export default SideMessage;
