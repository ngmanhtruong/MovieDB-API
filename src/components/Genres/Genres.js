import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useGenresFetch } from '../../hooks/useGenresFetch';

//styles
import { Wrapper } from './Genres.style';
//helpers
import { selectGenre } from "../../helpers";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setGenreforURL,
  state
}) => {
  
  const handleAdd = (genre) => {
      setSelectedGenres([...selectedGenres, genre]);
      setGenres(genres.filter((g) => g.id !== genre.id));
      const genresURL = selectGenre(selectedGenres);
      setGenreforURL(genresURL);
  };

  const handleRemove = (genre) => {
      setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
      );
      setGenres([...genres, genre]);
      const genresURL = selectGenre(selectedGenres);
      setGenreforURL(genresURL);
  };

  //INITIAL
  useEffect(() => {
    setGenres(state.genres);
    return () => {
      setGenres([]); // unmounting
    };
  }, [setGenres, state]);

  return (
    <Wrapper>
      {selectedGenres && selectedGenres.map((genre) => (
        <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres && genres.map((genre) => (
        <Chip
            style={{ margin: 5, padding: 5 }}
            label={genre.name}
            color="secondary"
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
        />
      ))}
    </Wrapper>
  );
};

export default Genres;
