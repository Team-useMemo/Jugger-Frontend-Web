import { useRef, useState } from 'react';

const useStateRef = <T>(initalState: T): [React.RefObject<T>, (state: T) => void] => {
  const [state, _setState] = useState<T>(initalState);
  const stateRef = useRef<T>(state);

  const setState = (state: T) => {
    _setState(state);
    stateRef.current = state;
  };

  return [stateRef, setState];
};

export default useStateRef;
