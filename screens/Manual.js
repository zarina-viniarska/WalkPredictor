import { View, Text, StyleSheet, Pressable, Switch, Image } from 'react-native';
import { useState, useEffect } from 'react';
import IconButton from "../components/iconButton";
import { go } from '../utils/network';

function Manual({ navigation }) {
    const [result, setResult] = useState(null)

    const [isSunny, setIsSunny] = useState(false);
    const [isCloudy, setIsCloudy] = useState(false);
    const [isRainy, setIsRainy] = useState(false);

    const toggleSwitchSunny = () => setIsSunny(previousState => !previousState);
    const toggleSwitchCloudy = () => setIsCloudy(previousState => !previousState);
    const toggleSwitchRainy = () => setIsRainy(previousState => !previousState);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#93B1A6',
            },
            headerTintColor: '#183D3D',
            title: 'Налаштування вручну',
            headerLeft: () => (
                <IconButton icon="arrow-back-circle" size={24} color="#183D3D" onPress={() => { navigation.goBack() }} />
            )
        })
    }, [navigation]);

    function onBtnPress() {
        res = go(isSunny, isCloudy, isRainy)
        setResult(res)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Налаштуйте погоду</Text>
            <View style={styles.switchesContainer}>
                <View style={styles.switchContainer}>
                    <Image
                        source={require('../assets/sun.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Switch
                        trackColor={{ false: '#767577', true: '#fca404' }}
                        thumbColor={isSunny ? '#ffd900' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSunny}
                        value={isSunny}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Image
                        source={require('../assets/cloud.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Switch
                        trackColor={{ false: '#767577', true: '#b3dafe' }}
                        thumbColor={isCloudy ? '#ecf4fc' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCloudy}
                        value={isCloudy}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.switchContainer}>
                    <Image
                        source={require('../assets/rain.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Switch
                        trackColor={{ false: '#767577', true: '#5e99cc' }}
                        thumbColor={isRainy ? '#e4ecfc' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchRainy}
                        value={isRainy}
                        style={styles.switch}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={onBtnPress}>
                    <Text style={styles.buttonText}>Чи йти на прогулянку?</Text>
                </Pressable>
            </View>
            <View style={styles.resultContainer}>
                {result == 1 && (
                    <Text style={styles.text}>Чудова погода щоб прогулятись!</Text>
                )}
                {result == 0 && (
                    <Text style={styles.text}>Краще залишитись вдома</Text>
                )}
            </View>
        </View>
    );
}

export default Manual;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040D12',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchesContainer: {
        width: '60%',
        height: 280,
        borderRadius: 20,
        padding: 20,
        borderWidth: 5,
        borderColor: '#183D3D',
    },
    switchContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '60%',
        backgroundColor: '#93B1A6',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#183D3D',
        fontWeight: '500',
        fontSize: 14,
    },
    title: {
        fontSize: 30,
        color: '#93B1A6',
        letterSpacing: 1,
        fontWeight: '700',
        marginBottom: 20,
    },
    resultContainer: {
        height: 100,
    },
    text: {
        fontSize: 24,
        color: '#f4f3f4',
        letterSpacing: 1,
        fontWeight: '700',
        margin: 20,
        textAlign: 'center',
    }
})