import { Text, View } from "react-native";
import { useState } from "react";
import Spacer from "../uiComponents/Spacer";
import PrimaryTextInput from "../uiComponents/text/PrimaryTextInput";
import PrimaryButton from "../uiComponents/buttons/PrimaryButton";
import Title from "../uiComponents/text/Title";
import apiCall from "../network/ApiClient";
import KeyStore from "../data/local/KeyStore";
import styles from "../uiComponents/styles";
import Strings from "../appConstants/strings";
import Route from "../navigation/routes";

export default function SignInScreen({ navigation }) {
  const [emailOrUserName, setEmailOrUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [enableButton, setEnableButton] = useState(false);

  const handleEmailOrUserName = (text) => {
    setEmailOrUserName(text);
  };

  const handlePasswordValidation = (text) => {
    if (emailOrUserName != null) {
      setPassword(text);
      setEnableButton(true);
    }
  };

  const handleLogin = async () => {
    if (enableButton) {
      try {
        const res = await apiCall("/auth/login", "POST", {
          username: emailOrUserName,
          password: password,
        });
        if (res.token) {
          await KeyStore.save("userToken", res.token);
         navigation.replace(Route.STACK_HOME_SCREEN);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.defaultContainer}>
      <Spacer height={100} />

      <Title text={Strings.SIGN_IN}></Title>

      <Spacer height={20} />

      <PrimaryTextInput
        placeholder={Strings.EMAIL_OR_USERNAME}
        onTextChange={handleEmailOrUserName}
      />

      <Spacer height={20} />

      <PrimaryTextInput
        placeholder={Strings.PASSWORD}
        shouldHide={true}
        maxLength={12}
        onTextChange={handlePasswordValidation}
      />

      <Spacer height={20} />

      <PrimaryButton
        label={Strings.CONTINUE}
        enabled={enableButton}
        onPress={handleLogin}
      />

      <Spacer height={20} />

      <Text>
        {Strings.DON_T_HAVE_AN_ACCOUNT}
        <Text
          onPress={() => navigation.navigate(Route.CREATE_ACCOUNT_SCREEN)}
          style={{ fontWeight: "bold" }}>
          Create One
        </Text>
      </Text>
    </View>
  );
}
