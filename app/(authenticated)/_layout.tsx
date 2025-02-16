import { Redirect, router, Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import tokenHandlers from "@/utils/tokenHandlers";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadTransactions } from "@/redux/slice/transactionSlice";
import { storage } from "@/common/storage";

export default function TabLayout() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.login);
  const { accessToken } = tokenHandlers.getTokens();

  useEffect(() => {
    if (accessToken) {
      dispatch(loadTransactions(accessToken as string));
    }
  }, [isLoggedIn, accessToken, dispatch]);

  if (!accessToken) return <Redirect href={"/(unauthenticated)"} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="addTransaction" />
    </Stack>
  );
}
