import SearchBar from "../components/SearchBar";
import NotesContainer from "../components/NotesContainer";

const Search = ({notes, setTab}) => {

  return (
    <>
        <SearchBar setTab={setTab}/>
        <NotesContainer notes={notes} view={'List'}/>
    </>
  );
}

export default Search;