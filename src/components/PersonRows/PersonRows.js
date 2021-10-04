import React from 'react';
import { Link } from 'react-router-dom';

import { Tr } from './PersonRows.style';

const PersonRows = ({ mediaType, mediaId, title, character, year }) =>{
    return (
        <Tr className='table-info'>
            <td className='year'>
                {year == 'upcoming' ? '...' : year }
            </td>
            <td className='seperator'>
                -
            </td>
            <td className='role'>
                <Link to={mediaType = 'movie' ? `/movie/${mediaId}`: `/tv/${mediaId}` }>
                    <bdi>{title}</bdi>
                </Link>
                <span className='group'>
                {character && <> <span className='as'> as </span> <span className='character'>{character}</span> </>}
                </span>
            </td>
        </Tr>
    )
}

export default PersonRows;