import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default HomePage;
