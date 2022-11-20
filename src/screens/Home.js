import { View, StyleSheet, Platform, Button } from "react-native";
import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import NotesContainer from "../components/NotesContainer";
import * as SQLite from 'expo-sqlite';

const Home = () => {

  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("db.db");
    return db;
  }
  
  const db = openDatabase();

  const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from notes;`,
        [],
        (_, { rows: { _array } }) => setNotes(_array)
      );
    });
  }, [forceUpdateId]);

  useEffect(() => {
    console.log(notes)
  }, [notes])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists notes (id integer primary key not null, title text, body text, created text, modified text);"
      );
    });
  }, []);

  const add = (title, body, created, modified) => {
    // is title empty?
    if (title === null || title === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into notes (title, body, created, modified) values (?,?,?,?)", [title, body, created, modified]);
        tx.executeSql("select * from notes", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  return (
      <View style={styles.home}>
          <TopMenu/>
          <NotesContainer notes={notes}/>
          <Button onPress={()=>add('Things to buy', 'some stuff', 'Nov 18', 'Nov 20')} title="Add Note"></Button>
      </View>
  )
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default Home;

const styles = StyleSheet.create({
    home: {
      backgroundColor: 'pink',
      height: '100%',
      width: '100%'
    }
});