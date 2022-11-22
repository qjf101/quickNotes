import { View, StyleSheet, Platform, Button } from "react-native";
import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import NotesContainer from "../components/NotesContainer";
import * as SQLite from 'expo-sqlite';
import dayjs from "dayjs";
import { TabBar } from "../components/TabBar";
import Search from "./Search";

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
  const [sort, setSort] = useState('Modified Time');
  const [view, setView] = useState('List');
  const [tab, setTab] = useState('blank');

  useEffect(() => {
    console.log(view)
  }, [view])

  const sortOptions = {
    'Modified Time': 'modified DESC',
    'Created Time': 'created DESC',
    'Alphabetically': 'title ASC' 
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from notes ORDER BY ${sortOptions[sort]};`,
        [],
        (_, { rows: { _array } }) => setNotes(_array)
      );
    });
  }, [sort, forceUpdateId]);

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

  const add = (title, body, date) => {
    // is title empty?
    if (title === null || title === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into notes (title, body, created, modified) values (?,?,?,?)", [title, body, date, date]);
        tx.executeSql("select * from notes", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  useEffect(() => {
    console.log(tab)
  }, [tab])

  return (
      <View style={styles.home}>
          { tab == 'search' ?
          <Search notes={notes} setTab={setTab}/>
          :
          <>
          <TopMenu sort={sort} setSort={setSort} view={view} setView={setView}/>
          <NotesContainer notes={notes} view={view}/>
          </>  
          }
          <TabBar tab={tab} setTab={setTab}/>
          {/* <Button onPress={()=>add('A noteA noteA noteA noteA noteA noteA noteA noteA noteA noteA noteA noteA noteA note', 'some stuff', dayjs('2019-11-18T10:07:35-05:00').format())} title="Add Note"></Button> */}
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
      backgroundColor: 'white',
      height: '100%',
      width: '100%'
    }
});