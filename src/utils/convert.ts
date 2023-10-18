export const convertLanguage = (lng: string) => {
    if (lng == 'vn') {
        return {
            title: 'Vietnamese',
            value: 'en',
            image: require('@images/unAuth/vietnam.png'),
        }
    }
    return {
        title: 'English',
        value: 'en',
        image: require('@images/unAuth/america.png'),
    }
}