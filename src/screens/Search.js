import SearchBar from "../components/SearchBar";
import NotesContainer from "../components/NotesContainer";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

const Search = ({notes, setTab}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [returnedNotes, setReturnedNotes] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setReturnedNotes([])
      setNoResults(false);
      return;
    };
    console.log(searchTerm)
    let notesArr = [];
    notes.map((n) => {
      const title = n.title.toLowerCase();
      const body = n.body.toLowerCase();
      const search = searchTerm.toLowerCase();
      if (title.includes(search) || body.includes(search)){
        notesArr.push(n);
      } 
    });

    setNoResults(!notesArr.length);
    setReturnedNotes(notesArr);
  }, [searchTerm])

  useEffect(() => {
    const backAction = () => {
      setTab('blank')
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
        <SearchBar setTab={setTab} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <NotesContainer notes={returnedNotes} view={'List'} noResults={noResults}/>
    </>
  );
}

export default Search;