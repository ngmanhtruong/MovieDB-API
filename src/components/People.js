import React from "react";
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Components
import Grid from "./Grid/Grid";
import Spinner from './Spinner/Spinner';
import SearchBar from "./SearchBar/SearchBar";
import Button from "./Button/Button";
import Actor from "./Actor/Actor";
//Hook
import { usePeopleFetch } from "../hooks/usePeopleFetch";
//Image
import NoPersonImage from '../images/no-image.svg';



const People = () => {
    const {state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore} = usePeopleFetch();
    
    if(error) return <div>Did Something went wrong ...</div>;
    console.log(state);
    return (
        <>
            <SearchBar setSearchTerm={setSearchTerm} text="Search for actors, directors, ..."/>
            <Grid header={searchTerm && 'Search Result'}>
                {state.results.map(person=>(
                    <Actor
                        key={person.credit_id}
                        clickable
                        name={person.name}
                        character={person.department}
                        imageUrl={
                            person.profile_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${person.profile_path}`
                            : NoPersonImage
                        }
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={()=> setIsLoadingMore(true)}/>
            )}
        </>
    )
}

export default People;
