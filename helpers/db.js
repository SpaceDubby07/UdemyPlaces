import * as SQLite from "expo-sqlite";

// this is our db file!
//openDatabase('database name')
const db = SQLite.openDatabase("places.db");

export const init = () => {
  // promise
  const promise = new Promise((resolve, reject) => {
    // create a basic sql table
    db.transaction((tx) => {
      tx.executeSql(
        // sql statement
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        // array of arguements - empty
        [],
        // success function
        () => {
          resolve();
        },
        // error function
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

// store stuff in database
export const insertPlace = (title, imageUri, address, lat, lng) => {
  // promise
  const promise = new Promise((resolve, reject) => {
    // create a basic sql table
    db.transaction((tx) => {
      tx.executeSql(
        // sql statement, ? is a placeholder
        "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)",
        // array of arguements to inject into db
        [title, imageUri, address, lat, lng],
        // success function
        (_, result) => {
          resolve(result);
        },
        // error function
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  // promise
  const promise = new Promise((resolve, reject) => {
    // create a basic sql table
    db.transaction((tx) => {
      tx.executeSql(
        // sql statement, ? is a placeholder
        "SELECT * FROM places",
        // array of arguements
        [],
        // success function
        (_, result) => {
          resolve(result);
        },
        // error function
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
