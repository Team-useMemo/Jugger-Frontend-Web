import { createContext, useContext } from 'react';
import { useChatLoader } from '@hooks/useChatLoader';

export const ChatLoaderContext = createContext<ReturnType<typeof useChatLoader> | null>(null);

export const ChatLoaderProvider = ({ children, categoryId }: { children: React.ReactNode; categoryId?: string }) => {
  const loader = useChatLoader(categoryId);
  return <ChatLoaderContext.Provider value={loader}>{children}</ChatLoaderContext.Provider>;
};

export const useChatContext = () => {
  const ctx = useContext(ChatLoaderContext);
  if (!ctx) throw new Error('ChatLoaderContext not found');
  return ctx;
};
