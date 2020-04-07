import React, {Fragment} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Swiper from './src/pages/Swiper';

const App = () => (
  <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Swiper />
    </SafeAreaView>
  </Fragment>
);

export default App;
