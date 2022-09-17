import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";
import { CAMERA_SCREEN } from "../constants";

export default function NotesScreenAdd() {
  const navigation = useNavigation();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubtitle, setnoteSubtitle] = useState("");
  const [noteBody, setnoteBody] = useState("");
  const dispatch = useDispatch();
  const canSave = [noteTitle, noteSubtitle].every(Boolean);

  async function savePost() {
    if (canSave) {
      try {
        const post = {
          id: nanoid(),
          title: noteTitle,
          content: noteSubtitle,
          detail: noteBody,
        };
        await dispatch(addNewPost(post));
      } catch (error) {
        console.error("Failed to save the post: ", error);
      } finally {
        navigation.goBack();
      }
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
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate(CAMERA_SCREEN)}>
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
    marginTop: 20,
    marginBottom: 10,
  },
  noteSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginBottom: 10,
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
    width: "40%",
    height: "40%"
  },
  uploadButtonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    padding: 15,
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