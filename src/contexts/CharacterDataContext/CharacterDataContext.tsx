import { createContext, useState } from "react";

export type TUpdateFilterHandler = (
  filterType: "name" | "status" | "species" | "gender" | "type" | "search",
  newValue: string
) => void;

export interface CharacterDataContextValues {
  nameFilter: string | null;
  statusFilter: string | null;
  speciesFilter: string | null;
  genderFilter: string | null;
  typeFilter: string | null;
  searchFilter: string | null;
  handleUpdateFilter: TUpdateFilterHandler;
}

export const CharacterDataContext = createContext<CharacterDataContextValues>(
  null as any
);

export const CharactersContextProvider = ({ children }: any) => {
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const handleUpdateFilter: TUpdateFilterHandler = (
    filterType: "name" | "status" | "species" | "gender" | "type" | "search",
    newValue: string
  ) => {
    switch (filterType) {
      case "name":
        setNameFilter(newValue);
        break;
      case "status":
        setStatusFilter(newValue);
        break;
      case "species":
        setSpeciesFilter(newValue);
        break;
      case "gender":
        setGenderFilter(newValue);
        break;
      case "type":
        setTypeFilter(newValue);
        break;
      case "search":
        setSearchFilter(newValue);
        break;
      default:
        break;
    }
  };

  const providerData = {
    nameFilter: nameFilter,
    statusFilter: statusFilter,
    speciesFilter: speciesFilter,
    genderFilter: genderFilter,
    typeFilter: typeFilter,
    searchFilter: searchFilter,
    handleUpdateFilter: handleUpdateFilter,
  };

  return (
    <CharacterDataContext.Provider value={providerData}>
      {children}
    </CharacterDataContext.Provider>
  );
};
