import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

//places key is an empty array
const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    // type SET_PLACES
    // this will load our places from our database
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
