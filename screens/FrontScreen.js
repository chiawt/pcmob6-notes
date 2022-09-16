import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AUTH_SCREEN } from "../constants";

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const FrontScreen = () => {
    const navigation = useNavigation();

  return (
    <View>
      <ImageBackground source={require('../assets/image2.jpg')} style={styles.image}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
                Explore the world
            </Text>

            <Text style={[styles.text, {
                fontSize: 16,
                alignItems: 'center',
                justifyContent: 'center',
                top: 40
            }]}>
                Discover great travel experiences
                {'\n'}
                in your country and beyond
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate(AUTH_SCREEN)}>
                <Text style={[styles.text, {
                    fontSize: 20,
                    color: 'white',
                    top: 90,
                    alignSelf: 'center'
                }]}>
                    Log in
                </Text>
            </TouchableOpacity>
          </View>
      </ImageBackground>
    </View>
  )
}

export default FrontScreen

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
        height: SCREENHEIGHT-(SCREENHEIGHT/3.2),
        width: SCREENWIDTH,
    },

    textContainer: {
        height: SCREENHEIGHT/2.8,
        width: SCREENWIDTH,
        backgroundColor: 'black',
        top: SCREENHEIGHT-(SCREENHEIGHT/2.8),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    text: {
        fontSize: 38,
        color: 'white',
        alignSelf: 'center',
        top: 20
    },

    button: {
        backgroundColor: 'white',
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 15,
        top: 70,
    }
})