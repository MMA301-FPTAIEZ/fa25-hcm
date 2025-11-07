import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useStorageContext } from "../provider/StorageProvider";
import { useAppContext } from "../provider/AppProvider";

const Custome = () => {
  const navigation = useNavigation();
  const { handbags } = useAppContext();
  const { storageData, addStorageData, removeStorageData, clearStorageData } =
    useStorageContext();

  const filteredHandbags = handbags?.sort((a, b) =>
    a.brand.charAt(0).localeCompare(b.brand.charAt(0))
  );

  const handleAddToFavorite = (item) => {
    if (storageData?.some((fav) => fav.id === item.id)) {
      Alert.alert("Remove from favorites", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            removeStorageData(item.id);
          },
        },
      ]);

      return;
    }
    addStorageData(item);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginVertical: 20,
          }}
        >
          Custome Screen
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Remove all data from favorites", "Are you sure?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  clearStorageData();
                },
              },
            ]);
          }}
          style={{
            marginBottom: 10,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Clear All Favorites
          </Text>
        </TouchableOpacity>

        <FlatList
          data={filteredHandbags}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                backgroundColor: "#f9f9f9",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Detail", { item })}
              >
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: "100%", height: 200, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  fontWeight: "600",
                }}
                onPress={() => navigation.navigate("Detail", { item })}
              >
                {item.handbagName}
              </Text>

              <Text
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: "500",
                  color: "red",
                }}
              >
                {Number(item.percentOff * 100).toFixed(0)}%
              </Text>

              <Text
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                {item.gender ? "Female" : "Male"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <TouchableOpacity onPress={() => handleAddToFavorite(item)}>
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      fontWeight: "600",
                      color: storageData?.some((fav) => fav.id === item.id)
                        ? "red"
                        : "green",
                    }}
                  >
                    {storageData?.some((fav) => fav.id === item.id)
                      ? "Added "
                      : "Add "}
                    to Favorite
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Custome;
