import { Text } from 'react-native'
import React from 'react'

const Countdown = ({ createdAt }: any) => {
    const [timeLeft, setTimeLeft] = React.useState<string>(''); // Define initial state

    React.useEffect(() => {
        const countdown = setInterval(() => {
            const createdTime = new Date(createdAt).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = createdTime + 15 * 60 * 1000 - currentTime; // Thêm 15 phút

            if (timeDifference < 0) {
                clearInterval(countdown);
                setTimeLeft('00:00:00');
            } else {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                setTimeLeft(`${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [createdAt]);

    return <Text style={{flexShrink: 1}}>{timeLeft}</Text>;
};

export default Countdown
