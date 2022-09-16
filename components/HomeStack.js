import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { BLOGS_STACK, PROFILE_STACK } from "../constants";
import ProfileStack from "./ProfileStack";
import BlogStack from "./BlogsStack";

const BottomTab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name == BLOGS_STACK) iconName = "list-alt";
          else iconName = "user";

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name={BLOGS_STACK} component={BlogStack} />
      <BottomTab.Screen name={PROFILE_STACK} component={ProfileStack} />
    </BottomTab.Navigator>
  );
}