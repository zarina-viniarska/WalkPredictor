import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

function Home({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#040D12',
            },
            headerTintColor: '#183D3D',
            title: '',
        })
    }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/sun.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Image
                        source={require('../assets/cloud.png')}
                        style={{ width: 40, height: 40 }}
                    />
                    <Image
                        source={require('../assets/rain.png')}
                        style={{ width: 40, height: 40 }}
                    />
                </View>
                <Text style={styles.title}>Walk predictor</Text>
            </View>

            <Text style={styles.text}>Оберіть варіант для продовження</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={() => { navigation.navigate("Manual") }}>
                    <Text style={styles.buttonText}>Налаштувати погоду вручну</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                    onPress={() => { navigation.navigate("Using API") }}>
                    <Text style={styles.buttonText}>Використати API</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040D12',
        padding: 20,
        paddingTop: '60%',
        alignItems: 'center',
    },
    button: {
        width: '42%',
        backgroundColor: '#93B1A6',
        borderRadius: 10,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#183D3D',
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageContainer: {
        width: '80%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleContainer: {
        position: 'absolute',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        color: '#f4f3f4',
        letterSpacing: 4,
        fontWeight: '800',
        marginBottom: 20,
        textAlign: 'center',
        width: '100%',
        textTransform: 'uppercase',
        textShadowColor: '#93B1A6',
        textShadowOffset: { width: 3, height: 0 },
        textShadowRadius: 1,
    },
    text: {
        fontSize: 30,
        color: '#f4f3f4',
        letterSpacing: 1,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        width: '80%',
    },
})