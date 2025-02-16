import { storage } from "@/common/storage";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/redux/slice/loginSlice";
import { deleteTransaction } from "@/redux/slice/transactionSlice";
import tokenHandlers from "@/utils/tokenHandlers";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const TransactionsScreen = () => {
  const { transactions } = useAppSelector((state) => state.transactions);
  const { accessToken } = tokenHandlers.getTokens();
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  // const data = transactions[`${accessToken}Transactions`] ?? [];

  const onDelete = (id: string) => {
    dispatch(deleteTransaction({ id, key: accessToken as string }));
  };

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log("accessToken", transactions);
    setData(transactions[`${accessToken}Transactions`] ?? []);
  }, [transactions]);

  console.log("data", data);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.title}>Transaction List</Text>
        <Text style={[styles.title, { color: "red" }]} onPress={onLogout}>
          Logout
        </Text>
      </View>
      {data.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <View style={styles.transaction}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>₹{item.amount}</Text>
              <Text style={styles.text}>{item.date}</Text>
              <Button
                title="Delete"
                onPress={() => onDelete(item.id)}
                color="red"
              />
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          backgroundColor: "red",
          borderRadius: 35,
          position: "absolute",
          bottom: 20,
          right: 20,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        onPress={() => router.navigate("/addTransaction")}
      >
        <Image
          source={require("@/assets/images/plus.png")}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  transaction: {
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "#ffffff",
    borderBottomColor: "#ccc",
    marginBottom: 5,
    borderRadius: 10,
  },
  text: { fontSize: 16 },
});

export default TransactionsScreen;
