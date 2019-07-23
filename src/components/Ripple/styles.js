import { StyleSheet } from 'react-native';

const radius = 10;
export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,

        backgroundColor: 'transparent',
        overflow: 'hidden',
    },

    ripple: {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        overflow: 'hidden',
        position: 'absolute',
    },
});