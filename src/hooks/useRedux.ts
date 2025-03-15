//useRedux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@stores/config/configStore';
//TypedUseSelectorHook:  Redux useSelector훅의 타입을 정의하는데 사용
//AppDispatch: Redux 애플리케이션에서 사용할 디스패치 함수의 타입을 정의하는데 사용
//RootState: Redux 스토어에서 사용할 전체 애플리케이션 상태의 타입을 정의하는데 사용

//DispatchFunc는 Redux 스토어의 디스패치 함수 타입을 정의하는 함수 타입
type DispatchFunc = () => AppDispatch;

//해석: useAppDispatch에 스토어의 디스패치 함수 타입을 정의한 후  "useDispatch 기능을 가져와 사용"
//"useDispatch 기능을 가져와 사용" ==> dispatch를 통해 action을 store에 전달하는 기능을 말한다.
export const useAppDispatch: DispatchFunc = useDispatch;

//해석: useAppSelector에 스토어의 전역상태 타입을 정의한 후 "useSelector 기능을 가져와 사용"
// "useSelector 기능을 가져와 사용" ==> store의 특정 state값을 가져오는 기능을 말한다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
