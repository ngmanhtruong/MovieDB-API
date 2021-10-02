import React from 'react';
import { useParams } from 'react-router';

//styles
import { Wrapper, Left, Right } from './Person.styles';

const Person = () =>{
    const {id} = useParams();
    console.log(id);

    return (
        <Wrapper>
            <Left>

            </Left>
            <Right>
                
            </Right>
        </Wrapper>
    )
}

export default Person;