import { CategoryProp } from '@ts/Category.Prop';

const categoryMock: CategoryProp[] = [
  {
    uuid: '2940b5ba-2352-4e8d-8344-5d6b24c70003',
    name: '독서록',
    isPinned: false,
    color: '#4F29E5',
    recentMessage: '도리안 그레이의 초상',
    updateAt: new Date('2025-04-02 15:03'),
  },
  {
    uuid: 'e596d7e3-634e-468a-b763-b818ddf67bdb',
    name: 'Jugger',
    isPinned: true,
    color: '#00BDDE',
    recentMessage: 'UI Component 제작',
    updateAt: new Date('2025-04-02 13:03'),
  },
  {
    uuid: '3',
    name: '4월 여행계획',
    isPinned: true,
    color: '#FF5E00',
    recentMessage:
      '최대 2줄 -> 반쎄오 꼭 먹어야지 반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지반쎄오 꼭 먹어야지',
    updateAt: new Date('2025-04-02 13:03'),
  },
  {
    uuid: '2f7809af-2208-4b2b-8b65-763326475800',
    name: 'Daily',
    isPinned: false,
    color: '#00AEFF',
    recentMessage: '운동 가기',
    updateAt: new Date('2025-04-01 13:03'),
  },
  {
    uuid: '5',
    name: '4월 여행계획',
    isPinned: false,
    color: '#CB59FF',
    recentMessage: '스미스 머신 스쿼트 3세트 * 20kg',
    updateAt: new Date('2025-03-02 13:03'),
  },
  {
    uuid: '6',
    name: '푸꾸옥 여행',
    isPinned: false,
    color: '#F553DA',
    recentMessage:
      '푸꾸옥 (호핑투어 - 후꾸옥고스트 or 피크타임 | 오션펄아일랜드) 5시 끝 → 야시장 후 켐비치 → 선셋타운 → 킹콩마트 → 그랜드 월드 (북부)',
    updateAt: new Date('2025-03-01 13:03'),
  },
];

export default categoryMock;
