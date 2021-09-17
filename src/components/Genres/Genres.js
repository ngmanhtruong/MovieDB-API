import { Chip } from "@mui/material";
import { useEffect } from "react";
import { useGenresFetch } from '../../hooks/useGenresFetch';

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {

    const {state,loading,error, setState} = useGenresFetch(type);

    
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setState(genres.filter((g) => g.id !== genre.id));
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
        selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setState([...genres, genre]);
    };

    useEffect(() => {
        setGenres(state);
        return () => {
        setGenres({}); // unmounting
        };
      // eslint-disable-next-line
    }, [setGenres]);

  return (
    <div style={{ padding: "6px 0" }}>
      {/* {selectedGenres && selectedGenres.map((genre) => (
        <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            color="primary"
            clickable
            size="small"
            onDelete={() => handleRemove(genre)}
        />
      ))} */}
      {/* {genres && genres.map((genre) => (
        <Chip
            style={{ margin: 2 }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
        />
      ))} */}
    </div>
  );
};

export default Genres;
