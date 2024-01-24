import { Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Countdown = ({ createdAt }: any) => {
    const [timeLeft, setTimeLeft] = useState<string>('');
    useEffect(() => {
        const countdown = setInterval(() => {
            const expirationTime = moment(createdAt).add(15, 'minute');
            const now = moment();
            const nowFormatted = now.format('YYYY-MM-DD HH:mm:ss');
            const expirationTimeFormatted = expirationTime.utc().format('YYYY-MM-DD HH:mm:ss');
            const duration = moment.duration(expirationTime.diff(now));
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            if (nowFormatted >= expirationTimeFormatted) {
                setTimeLeft('00:00');
                clearInterval(countdown);
            } else {
                setTimeLeft(`${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [createdAt]);

    return <Text style={{ flexShrink: 1, color: 'red' }}>{timeLeft}</Text>;
};

export default Countdown;