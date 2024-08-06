import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import PrimaryButton from "../uiComponents/buttons/PrimaryButton";
import PrimaryTextInput from "../uiComponents/text/PrimaryTextInput";
import styles from "../uiComponents/styles";
import { useNavigation } from "@react-navigation/native";
import Route from "../navigation/routes";
import Spacer from "../uiComponents/Spacer";
import KeyStore from "../data/local/KeyStore";
import Strings from "../appConstants/strings";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/users/1");
        console.log(response.data);
        setUser(response.data);
        setUserData({
          firstname: response.data.name.firstname,
          lastname: response.data.name.lastname,
          email: response.data.email,
          phone: response.data.phone,
          address: {
            city: response.data.address.city,
            street: response.data.address.street,
            number: response.data.address.number,
            zipcode: response.data.address.zipcode,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await KeyStore.delete("userToken");
      navigation.replace(Route.SIGN_IN_SCREEN);
      console.log("Logged out and token removed");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/users/${user.id}`,
        {
          name: {
            firstname: userData.firstname,
            lastname: userData.lastname,
          },
          email: userData.email,
          phone: userData.phone,
          address: {
            city: userData.address.city,
            street: userData.address.street,
            number: userData.address.number,
            zipcode: userData.address.zipcode,
            geolocation: user.address.geolocation, // keep the same geolocation
          },
          username: user.username,
          password: user.password,
        }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.userProfileSafeArea}>
      <ScrollView contentContainerStyle={styles.userProfileContainer}>
        <Text style={styles.userProfileHeading}>Profile</Text>
        <View style={styles.userProfileField}>
          <Text>First Name:</Text>
          <PrimaryTextInput
            placeholder="First Name"
            onTextChange={(text) =>
              setUserData({ ...userData, firstname: text })
            }
            shouldHide={false}
            maxLength={50}
            value={userData.firstname}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Last Name:</Text>
          <PrimaryTextInput
            placeholder="Last Name"
            onTextChange={(text) =>
              setUserData({ ...userData, lastname: text })
            }
            shouldHide={false}
            maxLength={50}
            value={userData.lastname}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Email:</Text>
          <PrimaryTextInput
            placeholder="Email"
            onTextChange={(text) => setUserData({ ...userData, email: text })}
            shouldHide={false}
            maxLength={50}
            value={userData.email}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Phone:</Text>
          <PrimaryTextInput
            placeholder="Phone"
            onTextChange={(text) => setUserData({ ...userData, phone: text })}
            shouldHide={false}
            maxLength={15}
            value={userData.phone}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>City:</Text>
          <PrimaryTextInput
            placeholder="City"
            onTextChange={(text) =>
              setUserData({
                ...userData,
                address: { ...userData.address, city: text },
              })
            }
            shouldHide={false}
            maxLength={50}
            value={userData.address.city}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Street:</Text>
          <PrimaryTextInput
            placeholder="Street"
            onTextChange={(text) =>
              setUserData({
                ...userData,
                address: { ...userData.address, street: text },
              })
            }
            shouldHide={false}
            maxLength={50}
            value={userData.address.street}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Number:</Text>
          <PrimaryTextInput
            placeholder="Number"
            onTextChange={(text) =>
              setUserData({
                ...userData,
                address: { ...userData.address, number: text },
              })
            }
            shouldHide={false}
            maxLength={10}
            value={userData.address.number.toString()}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <View style={styles.userProfileField}>
          <Text>Zipcode:</Text>
          <PrimaryTextInput
            placeholder="Zipcode"
            onTextChange={(text) =>
              setUserData({
                ...userData,
                address: { ...userData.address, zipcode: text },
              })
            }
            shouldHide={false}
            maxLength={10}
            value={userData.address.zipcode}
            editable={isEditing} // Pass the editable prop
          />
        </View>
        <PrimaryButton
          label={isEditing ? Strings.SAVE_CHANGES : Strings.EDIT_PROFILE}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
          enabled={true}
        />

        <Spacer height={20} />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{Strings.LOGOUT}</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
