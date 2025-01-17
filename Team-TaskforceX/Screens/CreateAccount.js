import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; //Wrong arrow, need to change
import { TextInput as RNPTextInput } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { useAccessibilityContext } from "./Components/AccessibilityContext"; // Import the context hook

export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfrim, setPasswordConfirm] = useState("");
  const [checkValidEmail, setCheckValidEmail] = useState("");
  
  const { accessibilitySettings, setAccessibilitySettings } = useAccessibilityContext();
  const { colourBlind, textLarge, isVoiceOverOn } = accessibilitySettings;
  // Set up a state to trigger re-renders when Access properties change
  const [accessPropertiesUpdated, setAccessPropertiesUpdated] = useState(0);

  //call this for voiceover
  const speak = (text) => {
    Speech.speak(text, {
      language: 'en', // Language code (e.g., 'en', 'es', 'fr', etc.)
      pitch: 1.0, // Pitch of the voice (0.5 to 2.0)
      rate: 1.0, // Speaking rate (0.1 to 0.9 for slow, 1.0 for normal, 1.1 to 2.0 for fast)
    });
  };

  const handleInputFocus = (label) => {
    if (isVoiceOverOn) {
      speak(label);
    }
  };


  const handleCheckEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setCheckValidEmail("Email address must be entered");
    } else if (reg.test(val) === false) {
      setCheckValidEmail("Please enter valid email address");
    } else if (reg.test(val) === true) {
      setCheckValidEmail("");
    }
  };

  const handleEmailConfirm = val => { // check if email are same 
    if (val != email) {
      setCheckValidEmail('Email does not match');
    } else {
      setCheckValidEmail('');
    }
  };

  const handlePassConfirm = val => { // check if pass are same 
    if (val != password) {
      setCheckValidEmail('Password does not match');
    } else {
      setCheckValidEmail('');
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFBFE',
      padding: 16,
    },
  
    //Back Arrow
    backArrow: {
      marginTop: 32,
    },
  
    //Title
    title: {
      fontSize: textLarge ? 30 : 24,
      fontFamily: "OpenSans_400Regular",
      color: "black",
      marginTop: 32,
      marginBottom: 16,
      lineHeight: 32,
    },
  
    //User input fields
    TextInputRNPTextInput: {
      borderRadius: 4,
      borderColor: "black",
      borderStyle: "solid",
      width: 361,
      height: 56,
      backgroundColor: "#FFFBFE",
      marginTop: 16,
    },
  
    //Small text
    text: {
      color: "black",
      fontSize: textLarge ? 16: 12,
      letterSpacing: 0.1,
      lineHeight: 20,
      fontWeight: '600',
      fontFamily: 'OpenSans_400Regular',
      marginTop: 8,
    },
  
    //Validation text
    emailValidationText: {
      color: "red",
      fontSize: textLarge ? 16: 12,
      letterSpacing: 0.1,
      lineHeight: 20,
      fontWeight: '600',
      fontFamily: 'OpenSans_400Regular',
    },
  
    //Continue button
    button: {
      borderRadius: 100,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:  colourBlind ? "red":"#8273a9",
      marginTop: 160,
      marginBottom: 32,
    },
  
    //Continue button text
    buttonText: {
      fontSize: textLarge ? 20: 16,
      letterSpacing: 0.1,
      lineHeight: 20,
      fontWeight: '700',
      fontFamily: 'OpenSans_400Regular',
      color: '#fff',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Icon
        style = {styles.backArrow}
        name="arrow-left"
        size={20}
        color="black"
        type="entypo"
        onPress={() => 
          {if (isVoiceOverOn == true) {
            speak("Back");
          };
          navigation.goBack()}}
      />
      <View>
        <Text style={styles.title}>Create Account</Text>
      </View>
      
      {/* Validation text */}
      {checkValidEmail ? (
        <Text style={styles.emailValidationText}>{checkValidEmail}</Text>
      ) : null} 
    
      <RNPTextInput //Enter email
        style={styles.TextInputRNPTextInput}
        placeholder="Email Address*"
        label="Email Address*"
        onFocus={() => handleInputFocus("Email Address")}
        mode="outlined"
        activeOutlineColor="#8273a9"
        theme={{
          fonts: {fontFamily: "OpenSans_400Regular", fontWeight: '600' },
          colors: {text: "black"},
        }}
        onChangeText={value => {
          setEmail(value);
          handleCheckEmail(value);
        }}
      />
      
      <RNPTextInput //Confirm email
        style={styles.TextInputRNPTextInput}
        placeholder="Confirm Email Address*"
        label="Confirm Email Address*"
        onFocus={() => handleInputFocus("Confirm Email Address")}
        mode="outlined"
        activeOutlineColor="#8273a9"
        theme={{
          fonts: {fontFamily: "OpenSans_400Regular", fontWeight: '600' },
          colors: {text: "black"},
        }}
        onChangeText={emailConfirm => {
          setEmailConfirm(emailConfirm);
          handleEmailConfirm(emailConfirm);
        }}
      />
    
      <RNPTextInput //Enter password
        style={styles.TextInputRNPTextInput}
        placeholder="Password*"
        label="Password*"
        onFocus={() => handleInputFocus("Password")}
        mode="outlined"
        activeOutlineColor="#8273a9"
        theme={{
          fonts: {fontFamily: "OpenSans_400Regular", fontWeight: '600' },
          colors: {text: "black"},
        }}
          secureTextEntry={true}
          onChangeText={password => 
            setPassword(password)
        }
      />
    
      <View>
        <Text style={styles.text}>Password must be a minimum of 8 characters</Text>
      </View>
      
      <RNPTextInput //Confirm password
          style={styles.TextInputRNPTextInput}
          placeholder="Confirm Password*"
          label="Confirm Password*"
          onFocus={() => handleInputFocus("Confirm Password")}
          mode="outlined"
          activeOutlineColor="#8273a9"
          theme={{
            fonts: {fontFamily: "OpenSans_400Regular", fontWeight: '600' },
            colors: {text: "black"},
          }}
          secureTextEntry={true}
          onChangeText={password => {
            setPasswordConfirm(password);
            handlePassConfirm(password);
          }}
      />
 
      <View>
        <Text style={styles.text}>* Mandatory information</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => 
          {if (isVoiceOverOn == true) {
            speak("Continue");
          };
          navigation.navigate("Authentication")}}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}



