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
      <Text style={[styles.title, textColor]}>{item.recipe_name}</Text>
      <Image
        style={styles.thumbnail}
        source={{
          uri:
            item.imageUrl,
        }}
      />
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
  let DATA = favoritesSelector.recipes;
  return (
    <SafeAreaView style={styles.container}>
      {!DATA ? (
        <Text> Loading... </Text>
      ) : (
        
          <FlatList
            data={favoritesSelector.recipes}
            renderItem={renderFavoritesFlatList}
            keyExtractor={(item) => item.id}
            extraData={favoritesSelector}
          />
          
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  item: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    //padding: 16,
    width: "100%",
    //borderRadius: 30,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
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
  tinyThyme: {
    width: 20,
    height: 20,
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
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Avenir",
    margin: 20,
  },
  itemText2: {
    fontSize: 16,
    color: "rgb(65, 140, 115)",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Avenir",
  },
  list: {
    flex: 1,
    width: "90%",
    //paddingTop: 100,
  },
  item: {
    backgroundColor: "#dce6df",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    //backgroundColor: "#dce6df",
    borderRadius: 20,
    borderColor: "teal",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
