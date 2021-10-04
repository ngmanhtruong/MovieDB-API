import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { usePersonFetch } from '../hooks/usePersonFetch';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

//styles
import { Wrapper, Left, Right, Image, Table } from './Person.styles';
import { Spinner } from './Spinner/Spinner.styles';
import NoPersonImage from '../images/no-image.svg';
import KnownFor from './KnownFor/KnownFor';
import PersonTable from './PersonTable/PersonTable';
import PersonRows from './PersonRows/PersonRows';

const Person = () =>{
    const {id} = useParams();
    const {state, error, loading} = usePersonFetch(id);
    const [years, setYears] = useState([]); //acting
    const [yearsCrew, setYearsCrew] = useState([]); //others
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const uniqueArr = []; 
    const uniqueNameArr = [];
    let tempArr = [];
    let newYears = [];

    const sortYears = (arr) =>{
        let yearsArr = [];     
        arr.map(item=>{
            let year;
            if(item.first_air_date){
                year = new Date(item.first_air_date).getFullYear();
            } else{
                year = new Date(item.release_date).getFullYear();
            }
            if (isNaN(year)){
                year = 'upcoming';
            }
            if(!yearsArr.includes(year)){
                if(year == 'upcoming'){
                    yearsArr.unshift(year);
                }
                else {
                    yearsArr.push(year);
                }
            }
        });

        return yearsArr;
    }
    useEffect(()=>{
        if (state){
            setCast([...state.movie_credits.cast,
                ...state.tv_credits.cast]);
            setCrew([...state.movie_credits.crew,
                ...state.tv_credits.crew]);
        }
    },[state, setCast, setCrew]);

    useEffect(()=>{
        setYears(sortYears(cast).sort((a,b)=> b - a));
    },[cast, setYears])

    if (loading) return <Spinner />
    if (error) return <div>Something is wrong ...</div>;

    return (
        <Wrapper>
            {state &&
            <>
            <Left>
                <Image src={state.profile_path 
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${state.profile_path}`
                : NoPersonImage}/>

                <div className='personal-info isPC'>
                    <h2>Personal Info</h2>
                    <div className='info'>
                        <h4>Known For</h4>
                        <p>{state.known_for_department}</p>
                    </div>
                    <div className='info'>
                        <h4>Gender</h4>
                        <p>{state.gender == 1 ? 'Female' : 'Male'}</p>
                    </div>
                    {state.birthday &&
                    <div className='info'>
                        <h4>Birthday</h4>
                        <p>{state.birthday}</p>
                    </div>
                    }
                    {state.place_of_birth &&
                    <div className='info'>
                        <h4>Place of Birth</h4>
                        <p>{state.place_of_birth}</p>
                    </div>
                    }
                    {state.also_known_as.length != 0 &&                         
                    <div className='info'>
                        <h4>Also Known As</h4>
                        {state.also_known_as.map(name=>(
                            <p key={name}>{name}</p>
                        ))}
                    </div>
                    }
                </div>
            </Left>
            <Right>
                <h2>{state.name}</h2>
                {state.biography &&
                    <div className='info'>
                    <h4>Biography</h4>
                    <p>{state.biography}</p>
                </div>}
                {state.person_results[0].known_for &&
                <div className='info'>
                    <h4>Known For</h4>
                    <KnownFor 
                        state={state.person_results[0].known_for} 
                        tv_cast={state.tv_credits.cast}
                        tv_crew={state.tv_credits.crew}
                        movie_cast={state.movie_credits.cast}
                        movie_crew={state.movie_credits.crew}
                    />
                </div>
                }
                <div className='info'>
                    <h4>Acting</h4>
                    <Table>
                        <tbody>
                            {years.map(value=>{
                                uniqueArr.splice(0);
                                return (
                                    <PersonTable key={value}>
                                        {cast.map(item=>{
                                            let year,type;
                                            if(item.first_air_date){
                                                year = new Date(item.first_air_date).getFullYear();
                                                type = 'tv';
                                            } else{
                                                year = new Date(item.release_date).getFullYear();
                                                type = 'movie';
                                            }
                                            if(isNaN(year)){
                                                year = 'upcoming'
                                            }
                                            if(year == value && !uniqueArr.includes(item.id)){
                                                uniqueArr.push(item.id);
                                                return (
                                                    <PersonRows 
                                                        key={item.id}
                                                        mediaType = {type}
                                                        mediaId = {item.id}
                                                        title={item.title ? item.title : item.name}
                                                        character={item.character}
                                                        year={year}
                                                    />
                                                )
                                            }
                                        })}
                                    </PersonTable>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                {crew.map(member=>{
                    if(!uniqueNameArr.includes(member.department)){
                        uniqueNameArr.push(member.department);
                        tempArr = [];
                        newYears = [];
                        for(let i = 0; i < crew.length; i++){
                            if (crew[i].department == member.department){
                                tempArr.push(crew[i]);
                            }
                        }
                        newYears = sortYears(tempArr);
                        return (
                            <div className='info'>
                                <h4>{member.department}</h4>
                                <Table>
                                    <tbody>
                                        {newYears.map(value=>{
                                            uniqueArr.splice(0);
                                            return (
                                                <PersonTable key={value}>
                                                    {crew.map(item=>{
                                                        let year,type;
                                                        if(item.first_air_date){
                                                            year = new Date(item.first_air_date).getFullYear();
                                                            type = 'tv';
                                                        } else{
                                                            year = new Date(item.release_date).getFullYear();
                                                            type = 'movie';
                                                        }
                                                        if(isNaN(year)){
                                                            year = 'upcoming'
                                                        }
                                                        if(year == value && !uniqueArr.includes(item.id) && item.department == member.department){
                                                            uniqueArr.push(item.id);
                                                            return (
                                                                <PersonRows 
                                                                    key={item.id}
                                                                    mediaType = {type}
                                                                    mediaId = {item.id}
                                                                    title={item.title ? item.title : item.name}
                                                                    character={item.character}
                                                                    year={year}
                                                                />
                                                            )
                                                        }
                                                    })}
                                                </PersonTable>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                })}

                <div className='personal-info isMobile'>
                        <h2>Personal Info</h2>
                        <div className='info'>
                            <h4>Known For</h4>
                            <p>{state.known_for_department}</p>
                        </div>
                        <div className='info'>
                            <h4>Gender</h4>
                            <p>{state.gender == 1 ? 'Female' : 'Male'}</p>
                        </div>
                        {state.birthday &&
                        <div className='info'>
                            <h4>Birthday</h4>
                            <p>{state.birthday}</p>
                        </div>
                        }
                        {state.place_of_birth &&
                        <div className='info'>
                            <h4>Place of Birth</h4>
                            <p>{state.place_of_birth}</p>
                        </div>
                        }
                        {state.also_known_as.length != 0 &&                         
                        <div className='info'>
                            <h4>Also Known As</h4>
                            {state.also_known_as.map(name=>(
                                <p key={name}>{name}</p>
                            ))}
                        </div>
                        }
                    </div>
            </Right>
            </>
            }
        </Wrapper>
    )
}

export default Person;