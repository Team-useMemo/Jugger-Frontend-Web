import { MemoProp } from '@ts/Memo.Prop';

const memoMock: MemoProp[] = [
  {
    id: 1,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-24T04:32:00'),
    categoryId: '3',
  },
  {
    id: 2,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-24T04:33:00'),
    categoryId: '3',
  },
  {
    id: 3,
    type: 'schedule',
    content: {
      title: '호핑 투어 예약',
      startDate: new Date('2025-04-19T14:00:00'),
      endDate: null,
    },
    date: new Date('2025-03-25T04:33:00'),
    categoryId: '3',
  },
  {
    id: 4,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-25T04:33:00'),
    categoryId: '2',
  },
  {
    id: 5,
    type: 'link',
    content: 'https://www.youtube.com/watch?v=9kfx7itbcbc',
    date: new Date('2025-03-25T04:33:00'),
    categoryId: '4',
  },
  {
    id: 6,
    type: 'photo',
    content:
      'https://png.pngtree.com/background/20250103/original/pngtree-pink-pastel-background-with-pink-aesthetic-sky-picture-image_15151458.jpg',
    date: new Date('2025-03-25T04:33:00'),
    categoryId: '1',
  },
  {
    id: 7,
    type: 'schedule',
    content: {
      title: '호핑 투어 예약',
      startDate: new Date('2025-04-19T14:00:00'),
      endDate: null,
    },
    date: new Date('2025-03-26T04:33:00'),
    categoryId: '2',
  },
  {
    id: 8,
    type: 'text',
    content: 'How are you?',
    date: new Date('2025-03-26T04:33:00'),
    categoryId: '2',
  },
];

export default memoMock;
