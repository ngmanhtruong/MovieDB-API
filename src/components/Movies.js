import react, { useState } from "react";
import MoviesCarousel from "./Carousel/Carousel";

const Movies = () => {
    const [state, setState] = useState();
    return (
        <MoviesCarousel />
    )
}

export default Movies;