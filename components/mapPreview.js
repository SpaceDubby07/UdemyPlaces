import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    // imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
    // not paying for google maps api for use in testing, using geoapify.com instead, this works :D
    imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${props.location.lng},${props.location.lat}&zoom=14&marker=lonlat:${props.location.lng},${props.location.lat};type:material;color:%23ff3421;icontype:awesome&apiKey=${ENV.geo}`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
