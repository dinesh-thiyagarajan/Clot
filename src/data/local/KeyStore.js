import * as SecureStore from "expo-secure-store";

class KeyStore {

  static async save(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Data saved successfully: ${key}`);
    } catch (error) {
      console.error("Error saving data", error);
    }
  }

  static async get(key) {
    try {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(`Data retrieved successfully: ${key}`);
        return result;
      } else {
        console.log("No value found for key:", key);
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  }

  static async delete(key) {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Data deleted successfully: ${key}`);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  }
}

export default KeyStore;
