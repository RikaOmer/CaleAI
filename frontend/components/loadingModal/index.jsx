import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../assets/Colors";
const LoadingModal = ({ isLoading }) => {
  return (
    <Modal transparent={true} visible={isLoading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default LoadingModal;
