import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { decrement, increment } from '@stores/modules/counterSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const isLogin = true;

  if (!isLogin) {
    // 로그인이 안 되어 있으면 로그인 페이지로 이동
    navigate('/login');
  }
  const dispatch = useAppDispatch();

  const count = useAppSelector((state) => state.counterSlice.value);

  return (
    <div>
      homePage
      <div
        onClick={() => {
          navigate('/login');
        }}
      >
        to Login
      </div>
      <>
        <h1>count: {count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </>
    </div>
  );
};

export default HomePage;
