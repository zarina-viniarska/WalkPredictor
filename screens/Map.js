import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/iconButton";

function Map({ route }) {
    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
    };
    const [selectedLocation, setSelectedLocation] = useState();
    const navigation = useNavigation();

    function selectLocationHandler(event) {
        if (initialLocation) {
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng });
    }

    const region = {
        latitude: initialLocation ? initialLocation.lat : 49.431133,
        longitude: initialLocation ? initialLocation.lng : 32.04923,
        latitudeDelta: 0.922,
        longitudeDelta: 0.421,
    };

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("Місце не обране", "Будь ласка оберіть місце торкнувшись екрану в потрібному місці");
        } else {
            navigation.navigate("Using API", {
                pickedLat: selectedLocation.lat,
                pickedLng: selectedLocation.lng,
            });
        }
    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#93B1A6',
            },
            headerTintColor: '#183D3D',
            title: 'Карта',
            headerLeft: () => (
                <IconButton icon="arrow-back-circle" size={24} color="#183D3D" onPress={() => { navigation.goBack() }} />
            )
        })
        navigation.setOptions({
            headerRight: () => (
                <IconButton icon="location" size={24} color="#183D3D" onPress={savePickedLocationHandler} />
            )
        })
    }, [navigation, savePickedLocationHandler, initialLocation]);

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}>
            {selectedLocation && (
                <Marker
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng
                    }}
                    title={"Обране місце"}
                />
            )}
        </MapView>
    );
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});