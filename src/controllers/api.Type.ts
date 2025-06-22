// Backend 전달용

// interface ScheduleProp {
//   title: string;
//   startDate: Date;
//   endDate: Date | null;
//   alarmBefore: number | null; //분 기준
//   description: string | null;
//   place: string | null;
// }

// interface ImageProp {
//   url: string;
//   description: string;
// }

// interface LinkProp {
//   url: string;
//   description: string;
// }

// interface MemoProp {
//   memoId: number;
//   memoType: 'text' | 'schedule' | 'link' | 'image';
//   content: string | ScheduleProp | ImageProp | LinkProp;
//   timestamp: Date;
//   categoryId: string | null;
// }

// //TotalMemo
// interface GetMemoBeforeRequestProps {
//   categoryId: string | null;
//   date: Date;
//   page: number; //20
//   size: number; //0
// }

// interface GetMemoAfterRequestProps {
//   categoryId: string | null;
//   date: Date;
// }

// //TextMemo
// interface PostMemoTextRequestProps {
//   categoryId: string | null;
//   text: string;
// }

// //ImageMemo
// interface PostMemoImageRequestProps {
//   categoryId: string | null;
//   file: File;
//   description: string | null;
// }

// interface GetMemoImageRequestProps {
//   categoryId: string | null;
//   page: number; //20
//   size: number; //0
// }

// //LinkMemo
// interface GetMemoLinkRequestProps {
//   categoryId: string | null;
//   page: number; //20
//   size: number; //0
// }

// //ScheduleMemo
// interface PostMemoScheduleRequestProps {
//   categoryId: string | null;
//   title: string;
//   startDate: Date;
//   endDate: Date | null;
//   alarmBefore: number | null; //분 기준
//   description: string | null;
//   place: string | null;
// }

// interface GetMemoScheduleRequestProps {
//   categoryId: string | null;
//   page: number; //20
//   size: number; //0
// }

// interface GetMemoResponseProps {
//   //모든 Memo에 대한 Get 요청은 아래 형식으로 통일
//   data: {
//     memoId: number;
//     memoType: 'text' | 'schedule' | 'link' | 'image';
//     content: string | ScheduleProp | ImageProp | LinkProp;
//     timestamp: Date;
//     categoryId: string | null;
//   }[];
// }

// //Category
// interface CategoryProp {
//   categoryId: string;
//   categoryName: string;
//   categoryColor: string;
//   isPinned: Date | null;
//   recentMessage: string;
//   updateAt: Date;
// }

// interface AddCategoryRequestProp {
//   categoryName: string;
//   categoryColor: string;
// }

// interface UpdateCategoryRequestProp {
//   categoryId: string;
//   categoryName: string;
//   categoryColor: string;
// }

// interface GetCategoryBeforeRequestProps {
//   date: Date;
//   page: number; //20
//   size: number; //0
// }

// interface GetCategoryAfterRequestProps {
//   date: Date;
// }

// interface PostCategoryPinRequestProp {
//   categoryId: string;
//   isPinned: boolean;
// }

// interface DeleteCategoryRequestProp {
//   categoryId: string;
// }
