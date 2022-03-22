import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    //geolocation api
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&format=json&apiKey=${ENV.geo}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something happened! HMMMMMMMM!");
    }

    const address = resData.results[0].formatted;
    console.log(resData);

    // generate image name,
    // split by slashes
    // pop the last element will be our file name
    const fileName = image.split("/").pop();

    // document directory is the path we want to put our files in
    // and our file name
    const newPath = FileSystem.documentDirectory + fileName;

    // move a file from a to b, takes an object, { from | to}
    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      // try inserting data into the database
      // title, imageUri (we saved this as newPath), address, lat, lng
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      // console.log(dbResult); - result below
      //WebSQLResultSet {
      //"insertId": 1,
      //"rows": WebSQLRows {
      //"_array": Array [],
      //"length": 0,
      //},
      //"rowsAffected": 1,
      //}

      // dispatch the action if successful
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      // fetch places from our db.js file
      const dbResult = await fetchPlaces();
      // console.log(dbResult);
      // we get the dbResult.rows._array from our console log, it is a heirarchy
      // so it goes dbResult === rows > _array > object { address, id, imageUri, lat, lng, title }
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
