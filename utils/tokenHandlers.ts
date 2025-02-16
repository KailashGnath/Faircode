import * as SecureStore from "expo-secure-store";

const setTokens = ({ accessToken }: { accessToken?: string }) => {
  if (accessToken) {
    SecureStore.setItem("accessToken", accessToken);
  }
};

const getTokens = () => {
  const accessToken = SecureStore.getItem("accessToken");

  return {
    accessToken,
  };
};

const clearTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
};

export default {
  setTokens,
  getTokens,
  clearTokens,
};
