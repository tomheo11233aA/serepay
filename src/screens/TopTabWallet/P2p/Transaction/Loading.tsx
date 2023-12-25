// Loading.js
import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import Safe from '@reuse/Safe';

const Loading = () => (
    <Safe flex={1} backgroundColor='white'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView source={require('../../../../assets/lottie/loading.json')} autoPlay loop />
        </View>
    </Safe>
);

export default React.memo(Loading);