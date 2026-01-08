
import { QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import {Provider} from "react-redux";
import { store } from './store';
import { queryClient } from './lib/queryClient';
import { AppRouter } from './routes/AppRouter';
export const App = () => {
  
  return (    
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

        <AppRouter />
      </QueryClientProvider>
    </Provider>

  );
};

export default App
