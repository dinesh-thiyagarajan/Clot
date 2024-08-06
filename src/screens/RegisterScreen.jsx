import React from "react";
import { useState } from "react";
import PrimaryTextInput from "../uiComponents/text/PrimaryTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../uiComponents/buttons/BackButton";
import Spacer from "../uiComponents/Spacer";
import Title from "../uiComponents/text/Title";
import PrimaryButton from "../uiComponents/buttons/PrimaryButton";
import styles from "../uiComponents/styles";
import Strings from "../appConstants/strings";
import apiCall from "../network/ApiClient";
import RandomStringGenerator from "../network/RandomStringGenerator";
import KeyStore from "../data/local/KeyStore";
import Route from "../navigation/routes";

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableButton, setEnableButton] = useState(false);

  const handleEnableButton = (text) => {
    if (
      firstName != null &&
      lastName != null &&
      email != null &&
      password != null
    ) {
      setPassword(text);
      setEnableButton(true);
    }
  };

  const handleFirstName = (firstName) => {
    setFirstName(firstName);
  };

  const handleLastName = (lastName) => {
    setLastName(lastName);
  };

  const handleEmail = (email) => {
    setEmail(email);
  };

  const handleCreateAccount = async () => {
    if (enableButton) {
      try {
        const response = await apiCall("/users", "POST", {
          email: email,
          username: firstName + lastName,
          password: password,
          name: {
            firstname: firstName,
            lastname: lastName,
          },
          address: {
            city: "kilcoole",
            street: "7835 new road",
            number: 3,
            zipcode: "12926-3874",
            geolocation: {
              lat: "-37.3159",
              long: "81.1496",
            },
          },
          phone: "1-570-236-7033",
        });

        if (response) {
          await KeyStore.save("userToken", RandomStringGenerator());
         navigation.replace(Route.STACK_HOME_SCREEN);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.defaultContainer}>
      <BackButton navigation={navigation}></BackButton>

      <Spacer height={20}></Spacer>

      <Title text={Strings.CREATE_ACCOUNT}></Title>

      <Spacer height={20}></Spacer>

      <PrimaryTextInput
        onTextChange={handleFirstName}
        placeholder={Strings.FIRST_NAME}></PrimaryTextInput>

      <Spacer height={20}></Spacer>

      <PrimaryTextInput
        onTextChange={handleLastName}
        placeholder={Strings.LAST_NAME}></PrimaryTextInput>

      <Spacer height={20}></Spacer>

      <PrimaryTextInput
        onTextChange={handleEmail}
        placeholder={Strings.EMAIL}></PrimaryTextInput>

      <Spacer height={20}></Spacer>

      <PrimaryTextInput
        shouldHide={true}
        onTextChange={handleEnableButton}
        placeholder={Strings.PASSWORD}></PrimaryTextInput>

      <Spacer height={40}></Spacer>

      <PrimaryButton
        label={Strings.CONTINUE}
        enabled={enableButton}
        onPress={handleCreateAccount}></PrimaryButton>
    </SafeAreaView>
  );
}
