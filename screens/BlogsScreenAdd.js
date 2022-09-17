import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";
import * as ImagePicker from 'expo-image-picker';

const imgPlaceholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrawJe0fJKDESUy3rHJh9dW3DZeBUfzuumiQ&usqp=CAU";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubtitle, setnoteSubtitle] = useState("");
  const [noteBody, setnoteBody] = useState("");
  const dispatch = useDispatch();
  const canSave = [noteTitle, noteSubtitle].every(Boolean);
  const [pickedImagePath, setPickedImagePath] = useState('');

  async function savePost() {
    if (canSave) {
      try {
        const post = {
          id: nanoid(),
          title: noteTitle,
          content: noteSubtitle,
          detail: noteBody,
          url: pickedImagePath,
        };
        await dispatch(addNewPost(post));
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        navigation.goBack();
      }
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
    // console.log(result);
    if (!result.cancelled) {
      setPickedImagePath(result.uri);
    }
  }

  return (
     <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"white"} />
      </TouchableOpacity>
      <TextInput
        style={styles.noteTitle}
        placeholder={"Country / Places of Interest"}
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
        selectionColor={"gray"}
      />

      <TextInput
        style={styles.noteSubtitle}
        placeholder={"Dates (Month-Year)"}
        value={noteSubtitle}
        onChangeText={(text) => setnoteSubtitle(text)}
        selectionColor={"gray"}
        multiline={true}
      />

      <View style={styles.imageContainer}>
        {
        <Image
          source={{ uri: pickedImagePath ?? imgPlaceholder }}
          style={styles.image}
        />
        }
      </View>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={showImagePicker}  title="Select an image">
        <Text style={styles.uploadButtonText}>Upload Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.noteBody}
        placeholder={"Tell us your feeling?"}
        value={noteBody}
        onChangeText={(text) => setnoteBody(text)}
        selectionColor={"gray"}
        multiline={true}
      />
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.button} onPress={async () => await savePost()}>
        <Text style={styles.buttonText}>Add Note</Text>
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
    borderColor: "white",
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