import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../features/notesSlice";

const imgPlaceholder = "https://picsum.photos/200";

export default function NotesScreenDetails() {
  const route = useRoute();
  const titleInputRef = useRef();
  const navigation = useNavigation();
  const params = route.params;
  const [noteTitle, setNoteTitle] = useState(params.title);
  const [noteSubtitle, setnoteSubtitle] = useState(params.content);
  const [noteBody, setnoteBody] = useState(params.detail);
  const [editable, setEditable] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const dispatch = useDispatch();
  const id = params.id;

  async function loadPhoto() {
    const photo = await AsyncStorage.getItem("photo_uri");
    setPhotoUri(photo);
  }

  async function updatePost(id) {
    try {
      const updatedPost = {
        id,
        title: noteTitle,
        content: noteSubtitle,
        detail: noteBody,
      };
      await dispatch(updatePostThunk(updatedPost));
    } catch (error) {
      console.error("Failed to update the post: ", error);
    } finally {
      navigation.goBack();
    }
  }

  async function deletePost(id) {
    try {
      await dispatch(deletePostThunk(id));
    } catch (error) {
      console.error("Failed to update the post: ", error);
    } finally {
      navigation.goBack();
    }
  }

  
  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      loadPhoto();
    });
    
    loadPhoto();
    return () => {
      removeListener();
    };
  }, []);


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name={"arrow-left"} size={24} color={"white"} />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => {
            setEditable(!editable);
            if (!editable) {
              setTimeout(() => titleInputRef.current.focus(), 100);
            } else {
              setTimeout(() => titleInputRef.current.blur(), 100);
            }
          }}
        >
          <FontAwesome
            name={"pencil"}
            size={24}
            color={editable ? "forestgreen" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deletePost(id)} style={{ marginLeft: 15 }}>
          <FontAwesome name={"trash"} size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.noteTitle}
        placeholder={"note title"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
        editable={editable}
        ref={titleInputRef}
      />
      <TextInput
        style={styles.noteSubtitle}
        placeholder={"Add your notes"}
        value={noteSubtitle}
        onChangeText={(text) => setnoteSubtitle(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <Image
        source={{ uri: photoUri ?? imgPlaceholder }}
        style={styles.imageContainer}
      />
      <TextInput
        style={styles.noteBody}
        placeholder={"Tell us your feeling?"}
        value={noteBody}
        onChangeText={(text) => setnoteBody(text)}
        selectionColor={"gray"}
        editable={editable}
        multiline={true}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={async () => updatePost(id)}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 30,
    padding: 25,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },
  noteSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginBottom: 10,
  },
  imageContainer: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "gray",
    color: "white",
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "40%",
    height: "40%"
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "75%",
    height: "30%"
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
    padding: 15,
    color: "black",
  },
});