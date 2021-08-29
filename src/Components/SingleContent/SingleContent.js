import React from 'react';
import './SingleContent.css'
import { img_300, unavailable } from '../../Config/Config'
import { Badge } from '@material-ui/core';
import ContentModal from '../ContentModal/ContentModal'
const SingleContent = ({ content, media_type }) => {

    const { id, title, poster_path, name, first_air_date, release_date, vote_average } = content

    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'}></Badge>
            <img className="poster" src={poster_path ? `${img_300}/${poster_path}` : unavailable} alt={title} />
            <b className="title">{title || name}</b>
            <span className="subTitle">
                {media_type === 'tv' ? "Tv Series" : "Movie"}
                <span className="subTitle">{first_air_date || release_date}</span>
            </span>
        </ContentModal>
    );
};

export default SingleContent;