import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
    useNavigation,
    useIsFocused,
} from "@react-navigation/native";
import { go } from '../utils/network';
import IconButton from "../components/iconButton";
import { FetchWeather } from "../utils/weather-api";

function UsingAPI({ route }) {
    const [pickedLocation, setPickedLocation] = useState();
    const [weatherResponse, setWeatherResponse] = useState();
    const [result, setResult] = useState(null)

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        setPickedLocation(null);
        setResult(null);

        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#93B1A6',
            },
            headerTintColor: '#183D3D',
            title: 'З використанням API',
            headerLeft: () => (
                <IconButton icon="arrow-back-circle" size={24} color="#183D3D" onPress={() => { navigation.goBack() }} />
            )
        })

        if (isFocused && route.params) {
            const mapPickedLocation = {
                latitude: route.params.pickedLat,
                longitude: route.params.pickedLng,
                latitudeDelta: 0.461,
                longitudeDelta: 0.211,
            };
            setPickedLocation(mapPickedLocation);
            const fetch = async () => {
                const weather = await FetchWeather(route.params.pickedLat, route.params.pickedLng);
                setWeatherResponse(weather);
            }
            fetch();
        }


    }, [route, isFocused]);

    function openMap() {
        navigation.navigate("Map");
    }

    async function onBtnPress() {
        if (!pickedLocation) {
            Alert.alert("Місце не обране", 'Для початку натисність на кнопку "Обрати місце на карті"');
        } else {
            let clouds = weatherResponse.weather[0].main.toLowerCase() === 'clouds' ? 1 : 0;
            let sun = weatherResponse.weather[0].main.toLowerCase() === 'clear' ? 1 : 0;
            let rain = weatherResponse.weather[0].main.toLowerCase() === 'rain' ? 1 : 0;
            if (weatherResponse.weather[0].description.toLowerCase() === 'few clouds') {
                clouds = 1;
                sun = 1;
            }
            if (weatherResponse.weather[0].description.toLowerCase() === 'moderate rain') {
                clouds = 1;
                sun = 1;
                rain = 1;
            }
            setResult(go(sun, clouds, rain))
        }
    }

    let locationPreview = <Text style={styles.textMap}>Місце не обране</Text>;

    if (pickedLocation) {
        locationPreview = (
            <MapView
                style={styles.image}
                initialRegion={pickedLocation}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
            >
                <Marker
                    coordinate={{
                        latitude: pickedLocation.latitude,
                        longitude: pickedLocation.longitude,
                    }}
                    title={"Обране місце"}
                />
            </MapView>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.weatherContainer}>
                {weatherResponse && (<><Text style={styles.weatherText}>Погода в {weatherResponse.name}, {weatherResponse.sys.country}</Text>
                    <View style={styles.weatherImgContainer}>
                        <Text style={styles.tempText}>{weatherResponse.main.temp}°C</Text>
                        <Image
                            source={{ uri: `http://openweathermap.org/img/w/${weatherResponse.weather[0].icon}.png` }}
                            style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={styles.weatherText}>{weatherResponse.weather[0].main}, {weatherResponse.weather[0].description}</Text>
                </>
                )}
            </View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                onPress={openMap}>
                <Text style={styles.buttonText}>Обрати місце на карті</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                onPress={onBtnPress}>
                <Text style={styles.buttonText}>Чи йти на прогулянку?</Text>
            </Pressable>
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

export default UsingAPI;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040D12',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B4B4B3",
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    textMap: {
        fontWeight: '300',
        color: '#183D3D',
        fontSize: 16,
        textAlign: 'center',
        borderRadius: 5,
        letterSpacing: 0.6,
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
    text: {
        fontSize: 24,
        color: '#f4f3f4',
        letterSpacing: 1,
        fontWeight: '700',
        margin: 10,
        textAlign: 'center',
    },
    weatherContainer: {
        width: '70%',
        height: 100,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherText: {
        fontSize: 16,
        color: '#f4f3f4',
        textAlign: 'center',
    },
    tempText: {
        fontSize: 28,
        color: '#f4f3f4',
        fontWeight: "300",
        paddingRight: 10,
    },
    weatherImgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    resultContainer: {
        marginTop: 20,
        width: '100%',
        height: 100,
    },
});