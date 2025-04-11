const categoryMock: {
  id: number;
  title: string;
  pinned: boolean;
  color: string;
  content: string;
  lastDate: Date;
}[] = [
  {
    id: 1,
    title: '독서록',
    pinned: false,
    color: '#4F29E5',
    content: '도리안 그레이의 초상',
    lastDate: new Date('2025-04-02 15:03'),
  },
  {
    id: 2,
    title: 'Jugger',
    pinned: true,
    color: '#00BDDE',
    content: 'UI Component 제작',
    lastDate: new Date('2025-04-02 13:03'),
  },
  {
    id: 3,
    title: '4월 여행계획',
    pinned: true,
    color: '#FF5E00',
    content:
      '최대 2줄 -> 반쎄오 꼭 먹어야지 반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지',
    lastDate: new Date('2025-04-02 13:03'),
  },
  {
    id: 4,
    title: 'Daily',
    pinned: false,
    color: '#00AEFF',
    content: '운동 가기',
    lastDate: new Date('2025-04-01 13:03'),
  },
  {
    id: 5,
    title: '4월 여행계획',
    pinned: false,
    color: '#CB59FF',
    content: '스미스 머신 스쿼트 3세트 * 20kg',
    lastDate: new Date('2025-03-02 13:03'),
  },
  {
    id: 6,
    title: '푸꾸옥 여행',
    pinned: false,
    color: '#F553DA',
    content:
      '푸꾸옥 (호핑투어 - 후꾸옥고스트 or 피크타임 | 오션펄아일랜드) 5시 끝 → 야시장 후 켐비치 → 선셋타운 → 킹콩마트 → 그랜드 월드 (북부)',
    lastDate: new Date('2025-03-01 13:03'),
  },
];

export default categoryMock;
