/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
            uri:
              item.imageUrl,
          }}
        />
        <MaterialCommunityIcons style={styles.icon} name={"heart"} size={32} color={"#20097B"} />
      </View>
      <Text style={[styles.textSubheader, textColor]}>{item.recipe_name}</Text>  
    </TouchableOpacity>
  );

  const navigationOpacity = (item, userUid) => {
    navigation.navigate("SingleRecipe", {
        id: item.id,
        title: item.recipe_name,
        image: item.imageUrl,
        userUid
      });
  };
  const renderFavoritesFlatList = ({ item }) => {
      
    return (
      <FavoritesFlatList
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigationOpacity(item, auth.currentUser.uid);
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
    shadowColor: "#2C594A",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "#FFFFFF",
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
  icon: {
    shadowColor: "rgb(44, 89, 74)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "flex-end",
    paddingLeft: "20%",
    paddingBottom: 10
  },
  thumbnail: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
