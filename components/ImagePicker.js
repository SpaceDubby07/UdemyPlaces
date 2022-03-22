import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    // we want to access the camera, so we need permissions
    // this is the proper syntax for requesting camera permission with expo as of 2021
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "Grant Camera permissions to use this app!",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const openCameraHandler = async () => {
    // check if the user has permission to use the camera
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    // this will open the device camera, it is an asyn operation and returns a promise
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    // console.Log(image) |output -- image object {cancelled: false, height: a number, type: image, uri: file location, width: a number}
    // since we want to set the picked image we get the file location and pass it in, so image.uri
    setPickedImage(image.uri);

    // we don't just store it internally, we also forward it to the parent component - add to NewPlaceScreen imagePicker component
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image Picked Yet!</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take a Picture"
        color={Colors.primary}
        onPress={openCameraHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
