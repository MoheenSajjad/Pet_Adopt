import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import useBreedList from "./useBreedList";
import Results from "./Results";
import AdoptedPetContext from "./AdoptedPetContext";
import fetchSearch from "./fetchSearch";

const ANIMAL = ["bird", "cat", "rabbit", "dog", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [Breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext); //adoptedPet context where we set the value

  const results = useQuery(["search", requestParams], fetchSearch);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {/* New Adopted pet start */}
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        {/* Adopted pet ends */}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMAL.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={Breeds.length === 0} name="breed">
            <option />
            {Breeds.map((breed) => {
              return <option key={breed}>{breed}</option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results results={results} />
    </div>
  );
};

export default SearchParams;
