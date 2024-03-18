import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";

const CharacterContent = () => {

  return (
    <>
      <Header />
      <Filters />
      <CharacterList />
    </>
  );
};

export default CharacterContent;
