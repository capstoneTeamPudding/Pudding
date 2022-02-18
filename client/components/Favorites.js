/* eslint-disable no-unused-vars */
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesThunk } from "../store/favorites";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../firebaseAuth/firebase";

export default function Favorites({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [Favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const favoritesSelector = useSelector((state) => state.favoritesReducer);

  const getFav = (userUid) => {
    dispatch(getFavoritesThunk(userUid));
  };

  useEffect(() => {
    const uid = auth.currentUser.uid;
    getFav(uid);
  }, []);

  const FavoritesFlatList = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <View style={styles.containerRow}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: item.imageUrl,
          }}
        />
        <MaterialCommunityIcons
          style={styles.icon}
          name={"heart"}
          size={32}
          color={"#20097B"}
        />
      </View>
      <Text style={[styles.textSubheader, textColor]}>{item.recipe_name}</Text>
    </TouchableOpacity>
  );

  const navigationOpacity = (item) => {
    //console.log("my item",item)
    navigation.navigate("SingleRecipe", {
      id: item.id,
      title: item.recipe_name,
      image: item.imageUrl,
    });
  };
  const renderFavoritesFlatList = ({ item }) => {
    return (
      <FavoritesFlatList
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigationOpacity(item, "u087CSU21PhXkg73Rd4Uxa2ugtw2");
        }}
      />
    );
  };
  let DATA = favoritesSelector;
  return (
    <SafeAreaView style={styles.container}>
      {!DATA ? (
        <Text> No Favorties :( </Text>
      ) : (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={favoritesSelector.recipes}
            renderItem={renderFavoritesFlatList}
            keyExtractor={(item) => item.id}
            extraData={favoritesSelector}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EDE9",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerRow: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  list: {
    flex: 1,
    width: "90%",
    paddingTop: 100,
  },
  item: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 30,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  textSubheader: {
    flex: 2,
    fontSize: 20,
    color: "#20097B",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
    flexWrap: "wrap",
    marginLeft: 30,
    marginTop: 10,
  },
  touchable: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    //padding: 16,
    color: "red",
    // borderRadius: 30,
    flexDirection: "row",
    margin: 20,
  },
  icon: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "flex-end",
    paddingLeft: "20%",
    paddingBottom: 10,
  },
  title1: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  heading: {
    fontSize: 25,
    color: "rgb(65, 140, 115)",
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily: "Avenir",
  },
  itemText2: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  title: {
    fontSize: 24,
    color: "teal",
    //paddingTop: 5,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
