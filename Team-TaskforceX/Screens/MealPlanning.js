import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { FilterChip } from "./Components/FilterChip";
import { firebase } from "../config";
import { useAccessibilityContext } from "./Components/AccessibilityContext"; // Import the context hook
import * as Speech from 'expo-speech';


const windowWidth = Dimensions.get("window").width;

const MealPlanning = () => {
  
  const navigation = useNavigation();
  const [none, setNone] = useState(true);
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [desert, setDesert] = useState(false);

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

  

  const CommitMealPlanData = () => {
    const mealPlanData = {
      userId: "so3ntivvUkAifQlZTYOb",
      breakfast: breakfast,
      lunch: lunch,
      dnner: dinner,
      desert: desert,
    };
    const uploadMealPlan = firebase.firestore().collection("MealPlans");
    uploadMealPlan.add(mealPlanData).catch((error) => {
      alert(error);
    });
  };

  const DATA = [
    {
      label: "None",
      checked: none,
      getData: { getName },
      invisible: false,
    },
    {
      label: "Breakfast",
      checked: breakfast,
      getData: { getName },
      invisible: false,
    },
    {
      label: "Lunch",
      checked: lunch,
      getData: { getName },
      invisible: false,
    },
    {
      label: "Dinner",
      checked: dinner,
      getData: { getName },
      invisible: false,
    },
    {
      label: "Desert",
      checked: desert,
      getData: { getName },
      invisible: false,
    },
    {
      label: "Invisible",
      checked: false,
      invisible: true,
    },
  ];

  const Item = ({ label, checked, invisible }) => (
    <FilterChip
      label={label}
      checked={checked}
      getData={getName}
      invisible={invisible}
      
    />
  );

  const renderItem = ({ item }) => (
    <Item
      label={item.label}
      checked={item.checked}
      getData={item.getName}
      invisible={item.invisible}
    />
  );

  function getName(label) {
    switch (label) {
      case "None":
        {
          if (none === false) {
            setBreakfast(false);
            setLunch(false);
            setDinner(false);
            setDesert(false);
          }
          if (!none || breakfast || lunch || dinner || desert) {
            setNone(!none);
          }
        }
        break;
      case "Breakfast":
        {
          if (breakfast === false) {
            setNone(false);
          } else if (!lunch && !dinner && !desert) {
            setNone(true);
          }
          setBreakfast(!breakfast);
        }
        break;
      case "Lunch":
        {
          if (lunch === false) {
            setNone(false);
          } else if (!breakfast && !dinner && !desert) {
            setNone(true);
          }
          setLunch(!lunch);
        }
        break;
      case "Dinner":
        {
          if (dinner === false) {
            setNone(false);
          } else if (!breakfast && !lunch && !desert) {
            setNone(true);
          }
          setDinner(!dinner);
        }
        break;
      case "Desert":
        {
          if (desert === false) {
            setNone(false);
          } else if (!breakfast && !lunch && !dinner) {
            setNone(true);
          }
          setDesert(!desert);
        }
        break;
    }
  }

  const styles = StyleSheet.create({
    paragraphText: {
      position: "relative",
      letterSpacing: -0.2,
      fontSize: textLarge ? 18 : 14,
      lineHeight: 24,
      fontFamily: "OpenSans_400Regular",
      color: "#000",
      textAlign: "left",
      height: 74,
      marginLeft: 16,
      marginRight: 16,
      marginTop: 38,
    },
    mealPlanningView: {
      position: "relative",
      backgroundColor: "#fffbfe",
      flex: 1,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      
    },
    column: {
      flexShrink: 1,
      
    },
    buttonPressable: {
      position: "absolute",
      bottom: 32,
      left: 16,
      borderRadius: 100,
      backgroundColor: "#8273a9",
      width: windowWidth - 32,
      overflow: "hidden",
      flexDirection: "column",
      paddingHorizontal: 24,
      paddingVertical: 10,
      boxSizing: "border-box",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 16,
      paddingRight: 16,
    },
    continueLabel: {
      position: "relative",
      fontSize: textLarge ? 20 : 16,
      letterSpacing: 0.1,
      lineHeight: 20,
      fontWeight: "700",
      fontFamily: "OpenSans_400Regular",
      color: "#fff",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  
    leadingIconPressable: {
      position: "relative",
      marginTop: 52,
      marginLeft: 16,
      width: 24,
      height: 24,
    },
    icon: {
      width: "100%",
      height: "100%",
    },
    headlineText: {
      marginLeft: 16,
      fontSize: textLarge ? 30 : 24,
      fontFamily: "OpenSans_400Regular",
      color: "black",
      marginTop: 32,
      lineHeight: 32,
    },
  
    list: {
      position: "relative",
      marginTop: 25,
      marginLeft: 8,
      marginRight: 8,
    },
  });


  return (
    <View style={styles.mealPlanningView}>
      <Icon //Back arrow
        style={styles.leadingIconPressable}
        name="arrow-left"
        size={20}
        color="black"
        type="entypo"
        onPress={() => 
          {if (isVoiceOverOn == true) {
            speak("Back");
          };navigation.goBack()}}
      />
          <Text style={styles.headlineText}>Meal Planning</Text>
       

      <Text style={styles.paragraphText}>
        Select which recipes our nutritionist will automatically recommend based
        on your preferences and health?
      </Text>

      <FlatList
        style={styles.list}
        paddingTop={1}
        data={DATA}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 16, marginHorizontal: 16 }} />
        )}
      />

      <Pressable
        style={styles.buttonPressable}
        onPress={() => {
          if (isVoiceOverOn == true) {
            speak("Continue");
          };
          CommitMealPlanData();
          navigation.navigate("Permissions");
        }}
      >
        <Text style={styles.continueLabel}>Continue</Text>
      </Pressable>
    </View>
  );
};



export default MealPlanning;
