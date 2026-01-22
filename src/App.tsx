
import { QueryClientProvider } from '@tanstack/react-query';
// import './App.css'
import {Provider} from "react-redux";
// import { store } from './store';
import { queryClient } from './lib/queryClient';
import { AppRouter } from './routes/AppRouter';
import { ToastProvider } from './components/ui/ToastProvider';
import { useTheme } from './features/Settings/hooks/useTheme';
import './index.css'

import { HeroUIProvider } from '@heroui/react';
import { store } from './store/store';
export const App = () => {
  const [theme]=useTheme() 
  return (    
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider>
            <div className={`${theme} min-h-screen bg-background text-foreground`}>
              <AppRouter />
            </div>
            
          </ToastProvider>
        </HeroUIProvider>
        
        
      </QueryClientProvider>
    </Provider>

  );
};

export default App
