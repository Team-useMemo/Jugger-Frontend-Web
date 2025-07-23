const Logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('provider');
  localStorage.removeItem('username');
  window.location.href = '/';
};

export { Logout };
