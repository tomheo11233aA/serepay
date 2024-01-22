import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import Safe from '@reuse/Safe';
import Txt from '@commom/Txt';
import { fonts } from '@themes/fonts';

const Loading = () => (
    <Safe flex={1} backgroundColor='white'>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <LottieView
                source={require('../../../../assets/lottie/loading.json')}
                style={{ width: 200, height: 200, alignSelf: 'center' }}
                autoPlay
                loop />
            <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
        </View>
    </Safe>
);

export default React.memo(Loading);