export const convertLanguage = (lng: string) => {
    if (lng == 'vn') {
        return {
            title: 'Tiếng Việt',
            value: 'en',
            image: require('@images/unAuth/vietnam.png'),
        }
    }
    if (lng == 'ko') {
        return {
            title: 'Korean',
            value: 'en',
            image: require('@images/unAuth/korea.png'),
        }
    }
    if (lng == 'ja') {
        return {
            title: 'Japanese',
            value: 'en',
            image: require('@images/unAuth/japan.png'),
        }
    }
    if (lng == 'zh') {
        return {
            title: 'Chinese',
            value: 'en',
            image: require('@images/unAuth/china.png'),
        }
    }
    if (lng == 'th') {
        return {
            title: 'Thailand',
            value: 'en',
            image: require('@images/unAuth/thailand.png'),
        }
    }
    if (lng == 'km') {
        return {
            title: 'Khmer',
            value: 'en',
            image: require('@images/unAuth/cambodia.png'),
        }
    }
    if (lng == 'lo') {
        return {
            title: 'Laos',
            value: 'en',
            image: require('@images/unAuth/laos.png'),
        }
    }
    if (lng == 'id') {
        return {
            title: 'Indonesia',
            value: 'en',
            image: require('@images/unAuth/indonesia.png'),
        }
    }
    if (lng == 'fr') {
        return {
            title: 'French',
            value: 'en',
            image: require('@images/unAuth/france.png'),
        }
    }
    if (lng == 'es') {
        return {
            title: 'Spanish',
            value: 'en',
            image: require('@images/unAuth/spain.png'),
        }
    }
    if (lng == 'it') {
        return {
            title: 'Italian',
            value: 'en',
            image: require('@images/unAuth/italy.png'),
        }
    }
    if (lng == 'de') {
        return {
            title: 'German',
            value: 'en',
            image: require('@images/unAuth/germany.png'),
        }
    }
    if (lng == 'pt') {
        return {
            title: 'Portuguese',
            value: 'en',
            image: require('@images/unAuth/portugal.png'),
        }
    }
    if (lng == 'tr') {
        return {
            title: 'Turkish',
            value: 'en',
            image: require('@images/unAuth/turkey.png'),
        }
    }
    if (lng == 'ru') {
        return {
            title: 'Russian',
            value: 'en',
            image: require('@images/unAuth/russia.png'),
        }
    }
    if (lng == 'nl') {
        return {
            title: 'Dutch',
            value: 'en',
            image: require('@images/unAuth/netherlands.png'),
        }
    }
    if (lng == 'ms') {
        return {
            title: 'Malay',
            value: 'en',
            image: require('@images/unAuth/malaysia.png'),
        }
    }
    if (lng == 'ar') {
        return {
            title: 'Arabic',
            value: 'en',
            image: require('@images/unAuth/arabic.png'),
        }
    }
    if (lng == 'he') {
        return {
            title: 'Hebrew',
            value: 'en',
            image: require('@images/unAuth/is.png'),
        }
    }
    if (lng == 'el') {
        return {
            title: 'Greek',
            value: 'en',
            image: require('@images/unAuth/greece.png'),
        }
    }
    if (lng == 'pl') {
        return {
            title: 'Polish',
            value: 'en',
            image: require('@images/unAuth/poland.png'),
        }
    }
    if (lng == 'hi') {
        return {
            title: 'Hindi',
            value: 'en',
            image: require('@images/unAuth/india.png'),
        }
    }
    return {
        title: 'English',
        value: 'en',
        image: require('@images/unAuth/america.png'),
    }
}