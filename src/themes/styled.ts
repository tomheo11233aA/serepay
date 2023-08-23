import { StyleSheet } from "react-native";

export const styled = StyleSheet.create({
    shadow: {
        elevation: 6,
        shadowColor: '#000',
        shadowRadius: 4.65,
        shadowOpacity: 0.27,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    box: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})