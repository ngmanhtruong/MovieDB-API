import { Chip } from '@mui/material/Chip';
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
    console.log(state);
    // const handleAdd = (genre) => {
    //     setSelectedGenres([...selectedGenres, genre]);
    //     setState(genres.filter((g) => g.id !== genre.id));
    //     setPage(1);
    // };

    // const handleRemove = (genre) => {
    //     setSelectedGenres(
    //     selectedGenres.filter((selected) => selected.id !== genre.id)
    //     );
    //     setState([...genres, genre]);
    //     setPage(1);
    // };

    // useEffect(() => {

    //     return () => {
    //     setState({}); // unmounting
    //     };
    // // eslint-disable-next-line
    // }, []);

  return (
      <>haha</>
    // <div style={{ padding: "6px 0" }}>
    //   {selectedGenres.map((genre) => (
    //     <Chip
    //         style={{ margin: 2 }}
    //         label={genre.name}
    //         key={genre.id}
    //         color="primary"
    //         clickable
    //         size="small"
    //         onDelete={() => handleRemove(genre)}
    //     />
    //   ))}
    //   {genres.map((genre) => (
    //     <Chip
    //         style={{ margin: 2 }}
    //         label={genre.name}
    //         key={genre.id}
    //         clickable
    //         size="small"
    //         onClick={() => handleAdd(genre)}
    //     />
    //   ))}
    // </div>
  );
};

export default Genres;
