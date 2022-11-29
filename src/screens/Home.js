import { View, StyleSheet, Platform, Button } from "react-native";
import { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import NotesContainer from "../components/NotesContainer";
import * as SQLite from 'expo-sqlite';
import { TabBar } from "../components/TabBar";
import Search from "./Search";
import EditNote from "./EditNote";

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
  const [selectedNote, setSelectedNote] = useState(null);
  const [sort, setSort] = useState('Modified Time');
  const [view, setView] = useState('List');
  const [tab, setTab] = useState('blank');

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
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists notes (id integer primary key not null, title text, body text, created text, modified text);"
      );
    });
  }, []);

  const create = (title, body, date) => {
    // is title empty?
    if (!title) {
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

  const update = (title, body, date, id) => {
    if (title === null || title === "") {
      return false;
    }
    
    db.transaction(
      tx => {
          tx.executeSql("UPDATE notes SET title=?, body=?, modified=? WHERE id=?", [title, body, date, id],
              (txObj, resultSet) => console.log('db data res ------>', resultSet),
              (txObj, error) => console.log('Error insert', error));
          forceUpdate();
    });
  };

  const deleteNote = (id) => {
    db.transaction(
      tx => {
          tx.executeSql("DELETE from notes WHERE id=?", [id],
              (txObj, resultSet) => console.log('db data res ------>', resultSet),
              (txObj, error) => console.log('Error delete', error));
          forceUpdate();
    });
  };

  return (
      <View style={styles.home}>
          { selectedNote ?
            <EditNote selectedNote={selectedNote} setSelectedNote={setSelectedNote} create={create} update={update} deleteNote={deleteNote}/>
            :
            <>
              { tab == 'search' ?
                <Search notes={notes} setTab={setTab}/>
              :
                <>
                  <TopMenu sort={sort} setSort={setSort} view={view} setView={setView}/>
                  <NotesContainer notes={notes} view={view} setSelectedNote={setSelectedNote}/>
                </>  
              }
              <TabBar tab={tab} setTab={setTab} setSelectedNote={setSelectedNote}/>
            </>
          }
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