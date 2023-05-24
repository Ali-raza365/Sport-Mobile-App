

import React from 'react';
import {
  SafeAreaView, Text
} from 'react-native';
// import { Loader } from './application/components';
import { AppBar } from './application/components';
import { COLORS } from './application/theme/config';
import { NavigationContainer } from '@react-navigation/native';
import Root from './application/navigation/Root';




function App(){

  const backgroundStyle = {
    backgroundColor: COLORS.primaryColor2,
    display:'flex',
    height:100,
  };


  return (
    <>
      <AppBar />
      <NavigationContainer>
        <Root/>
      </NavigationContainer>
      </>
  );
}



export default App;
