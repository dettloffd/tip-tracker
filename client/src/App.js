import './App.css';
import AppHome from './AppHome';
import { React, useCallback, useState } from "react";
import {ChakraProvider} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
    <div className="App">
      <AppHome>
        
      </AppHome>

    </div>
    </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
