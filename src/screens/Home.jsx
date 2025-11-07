import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useAppContext } from "../provider/AppProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStorageContext } from "../provider/StorageProvider";

const Home = () => {
  const navigation = useNavigation();
  const { handbags, brands } = useAppContext();
  const { storageData, addStorageData } = useStorageContext();

  const [selectedBrand, setSelectedBrand] = useState(null);

  const filteredHandbags = handbags
    ?.sort((a, b) => b.cost - a.cost)
    .filter((item) => selectedBrand === null || item.brand === selectedBrand);

  const handleAddToFavorite = (item) => {
    if (storageData?.some((fav) => fav.id === item.id)) return;
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
          HomeScreen
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Brands
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {brands?.map((brand) => (
            <TouchableOpacity
              key={brand}
              onPress={() => {
                setSelectedBrand(brand === selectedBrand ? null : brand);
              }}
              style={{
                width: "30%",
                padding: 5,
                borderWidth: 1,
                borderColor: "#b3b3b3ff",
                borderRadius: 24,
                backgroundColor: brand === selectedBrand ? "#ccc" : "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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

export default Home;
