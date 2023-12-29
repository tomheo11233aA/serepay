import { Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Countdown = ({ createdAt }: any) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    useEffect(() => {
        const countdown = setInterval(() => {
            const expirationTime = moment(createdAt).add(15, 'minutes');
            const now = moment();
            const duration = moment.duration(expirationTime.diff(now));
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            if (minutes < 0 || seconds < 0) {
                setTimeLeft('00:00');
            } else {
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [createdAt]);

    return <Text style={{ flexShrink: 1, color: 'red'}}>{timeLeft}</Text>;
};

export default Countdown;