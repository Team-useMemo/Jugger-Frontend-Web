import formatDate from '@utils/Date';
import { MessageItem, MessageBody, MessageHeader, Title, Time, Content, Dot, HeaderLeft } from './SideMessage.Style';
import PinSVG from '@assets/Sidebar/Pin.svg?react';
import { useNavigate } from 'react-router-dom';
interface SideMessageItemProps {
  focus: boolean;
  id: number;
  color: string; // 말풍선 앞 점 색상
  title: string;
  content: string;
  time: Date;
  isPinned?: boolean;
}

const SideMessage = ({ focus, id, color, title, content, time, isPinned }: SideMessageItemProps) => {
  const navigate = useNavigate();

  const handleClickCategory = () => {
    navigate(`?category=${id}`);
  };

  return (
    <MessageItem onClick={handleClickCategory} focus={focus}>
      <Dot style={{ backgroundColor: color }} />
      <MessageBody>
        <MessageHeader>
          <HeaderLeft>
            <Title>{title}</Title>
            {isPinned && <PinSVG />}
          </HeaderLeft>
          <Time>
            {time.toDateString() != new Date().toDateString()
              ? formatDate(time, '{M}.{DD}')
              : formatDate(time, '{hh}:{mm}')}
          </Time>
        </MessageHeader>
        <Content>{content}</Content>
      </MessageBody>
    </MessageItem>
  );
};

export default SideMessage;
