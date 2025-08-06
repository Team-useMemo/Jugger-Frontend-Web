import styled from '@emotion/styled';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router';

const StyledBody = styled.div(({ theme }) => ({
  backgroundColor: theme.color.background[theme.mode === 'dark' ? 'inverse' : 'normal'],
  color: theme.color.label[theme.mode === 'dark' ? 'inverse' : 'normal'],
}));

function App() {
  return (
    <StyledBody>
      <RouterProvider router={router} />
    </StyledBody>
  );
}

export default App;
