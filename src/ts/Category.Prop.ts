export interface CategoryProp {
  categoryId: string;
  categoryName: string;
  isPinned: boolean;
  categoryColor: string;
  recentMessage: string;
  updateAt: Date;
}
export interface CategoryResponseProp {
  uuid: string;
  name: string;
  isPinned: boolean;
  color: string;
  recentMessage: string;
  updateAt: Date;
}
