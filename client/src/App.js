import './App.css';
import AppHome from './AppHome';
import { React } from "react";
import {ChakraProvider} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        
    <div className="App">
      <AppHome>
        
        
      </AppHome>

    </div>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
