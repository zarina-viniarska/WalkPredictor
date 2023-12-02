import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function IconButton({ icon, size, color, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} color={color} size={size}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        margin: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.6,
    }
});

export default IconButton;