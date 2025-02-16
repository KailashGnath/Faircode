// import { router } from "expo-router";
// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { MMKV } from "react-native-mmkv";
// import Toast from "react-native-toast-message";

// // Assume MMKV is globally initialized
// const storage = new MMKV();

// const AddTransactionScreen = () => {
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

//   const saveTransaction = () => {
//     if (!title || !amount || !date) {
//       Alert.alert("Error", "Please fill all fields");
//       return;
//     }

//     const newTransaction = {
//       id: Date.now().toString(),
//       title,
//       amount: parseFloat(amount),
//       date,
//     };

//     const storedData = storage.getString("transactions");
//     const transactions = storedData ? JSON.parse(storedData) : [];

//     const updatedTransactions = [...transactions, newTransaction];
//     storage.set("transactions", JSON.stringify(updatedTransactions));

//     Toast.show({
//       type: "success",
//       text1: "Success",
//       text2: "Transaction added successfully",
//     });
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Transaction</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Amount"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD)"
//         value={date}
//         onChangeText={setDate}
//         keyboardType="decimal-pad"
//       />

//       <Button title="Save Transaction" onPress={saveTransaction} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
// });

// export default AddTransactionScreen;

import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { storage } from "@/common/storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { addTransaction } from "@/redux/slice/transactionSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import tokenHandlers from "@/utils/tokenHandlers";

type TransactionData = z.infer<typeof transactionSchema>;

const transactionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

const AddTransactionScreen = () => {
  const { accessToken } = tokenHandlers.getTokens();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const saveTransaction = (data: TransactionData) => {
    const newTransaction = {
      id: Date.now().toString(),
      title: data.title,
      amount: parseFloat(data.amount),
      date: data.date,
    };

    dispatch(
      addTransaction({
        transaction: newTransaction,
        key: accessToken as string,
      })
    );
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Transaction added successfully",
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={value}
              onChangeText={onChange}
            />
            {errors.title && (
              <Text style={styles.error}>{errors.title.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
            {errors.amount && (
              <Text style={styles.error}>{errors.amount.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={value}
              onChangeText={onChange}
            />
            {errors.date && (
              <Text style={styles.error}>{errors.date.message}</Text>
            )}
          </View>
        )}
      />

      <Button
        title="Save Transaction"
        onPress={handleSubmit(saveTransaction)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: { color: "red", marginBottom: 10 },
});

export default AddTransactionScreen;
