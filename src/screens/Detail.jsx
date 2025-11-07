import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useStorageContext } from "../provider/StorageProvider";

const Detail = () => {
  const route = useRoute();
  const { item } = route.params;
  const { storageData, removeStorageData, addStorageData } =
    useStorageContext();

  const handleAddToFavorite = (item) => {
    if (storageData?.some((fav) => fav.id === item.id)) {
      removeStorageData(item.id);
      return;
    }
    addStorageData(item);
  };

  return (
    <View
      style={{
        padding: 12,
        marginVertical: 10,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
        flex: 1,
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ width: "100%", height: 200, borderRadius: 8 }}
        resizeMode="cover"
      />

      <Text
        style={{
          marginTop: 8,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {item.handbagName}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: "red",
          }}
        >
          {Number(item.percentOff * 100).toFixed(0)}%
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {(item.cost * 26000).toLocaleString()} VND
        </Text>
      </View>
      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Gender: {item.gender ? "Female" : "Male"}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Category: {item.category}
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Colors: {item.color.join(", ")}
      </Text>

      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        Brand: {item.brand}
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
            {storageData?.some((fav) => fav.id === item.id) ? "Added " : "Add "}
            to Favorite
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;
