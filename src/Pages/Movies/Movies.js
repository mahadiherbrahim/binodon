import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';
import Genres from '../../Components/Genres/Genres';
import SingleContent from '../../Components/SingleContent/SingleContent';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [numberOfPage, setNumberOfPage] = useState();
    const [content, setContent] = useState([])
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setNumberOfPage(data.total_pages)
        setContent(data.results)
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <span className="pageTitle">Movies</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trendingContent">
                {
                    content && content.map((c) =>
                        <SingleContent key={c.id} content={c} />
                    )
                }
            </div>
            {
                numberOfPage > 1 && <CustomPagination setPage={setPage} numberOfPages={numberOfPage} />
            }

        </div>
    );
};

export default Movies;