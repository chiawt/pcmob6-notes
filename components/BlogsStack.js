import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BLOGS_SCREEN } from "../constants";
import BlogsScreenAdd from "../screens/BlogsScreenAdd";
import BlogsScreenHome from "../screens/BlogsScreenHome";
import BlogsScreenDetails from "../screens/BlogsScreenDetails";

const NotesStackNav = createStackNavigator();

export default function NotesStack() {
  return (
    <NotesStackNav.Navigator>
      <NotesStackNav.Screen
        name={BLOGS_SCREEN.Home}
        component={BlogsScreenHome}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={BLOGS_SCREEN.Add}
        component={BlogsScreenAdd}
        options={{ headerShown: false }}
      />
      <NotesStackNav.Screen
        name={BLOGS_SCREEN.Details}
        component={BlogsScreenDetails}
        options={{ headerShown: false }}
      />
    </NotesStackNav.Navigator>
  );
}