import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import * as ImagePicker from 'expo-image-picker';

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
  const [photoUri, setPhotoUri] = useState(params.url);
  console.log(params.url)
  const dispatch = useDispatch();
  const id = params.id;

  async function updatePost(id) {
    try {
      const updatedPost = {
        id,
        title: noteTitle,
        content: noteSubtitle,
        detail: noteBody,
        url: photoUri,
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


  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  }

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
      <View style={styles.imageContainer}>
        {
        <Image
          source={{ uri: photoUri }}
          style={styles.image}
        />
        }
      </View>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={showImagePicker}  title="Select an image">
        <Text style={styles.uploadButtonText}>Upload New Photo</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    marginBottom: 10,
  },
  noteSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 5,
    resizeMode: 'cover'
  },
  imageContainer: {
    borderRadius: 3,
    borderWidth: 2,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: "30%",
    height: "35%"
  },
  uploadButton: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "gray",
    color: "white",
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  uploadButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    padding: 10,
    color: "white",
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