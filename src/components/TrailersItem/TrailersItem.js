import { Wrapper, Image, Title } from './TrailersItem.styles';
import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import PlayImage from '../../images/play.svg';

const TrailersItem = ({ image, title, videoId }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Wrapper>
            <Image img={PlayImage}>
                <i className="fas fa-play" onClick={()=> setOpen(true)}></i>
                <img src={image} onClick={()=> setOpen(true)}/>
            </Image>
            <Title>
                <h3 title={title}>{title}</h3>
            </Title>
            <ModalVideo 
                channel = 'youtube' 
                isOpen={isOpen} 
                videoId={videoId} 
                autoplay={0}
                onClose={()=> setOpen(false)} 
            />
        </Wrapper>
    )
}

export default TrailersItem;