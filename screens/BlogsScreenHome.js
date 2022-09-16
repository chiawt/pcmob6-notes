import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS, BLOGS_SCREEN } from "../constants";
import { fetchPosts } from "../features/notesSlice";

export default function BlogsScreenHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // state.notes = { posts: [],
  // status: API_STATUS.idle,
  // error: null,
  // }}
  const posts = useSelector((state) => state.notes.posts);
  const notesStatus = useSelector((state) => state.notes.status);
  const isLoading = notesStatus === API_STATUS.pending;

  useEffect(() => {
    if (notesStatus === API_STATUS.idle) {
      dispatch(fetchPosts());
    }
  }, [notesStatus, dispatch]);

  function renderItem({ item }) {
    return (
      <Animated.View
        entering={SlideInLeft.delay(item.index * 100 )}
        exiting={SlideOutRight.delay(300)}
      >
        <TouchableOpacity style={styles.noteCard} onPress={() => navigation.navigate(BLOGS_SCREEN.Details, item)}>
          <Text style={styles.noteCardTitle}>{item.title}</Text>
          <Text style={styles.noteCardBodyText}>
            {item.content.substring(0, 120)}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Blogs</Text>

      {isLoading && <ActivityIndicator />}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(BLOGS_SCREEN.Add)}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "gray",
    borderWidth: 3,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  noteCardTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    marginBottom: 7,
  },
  noteCardBodyText: {
    fontSize: 12,
    fontWeight: "300",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 30,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "50%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "black",
  },
});
