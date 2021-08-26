import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SingleContent from '../../Components/SingleContent/SingleContent';
import './Trending.css'
import CustomPagination from '../../Components/CustomPagination/CustomPagination'
const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        console.log(data.results);
        setContent(data.results)
    };
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trendingContent">
                {
                    content && content.map((c) =>
                        <SingleContent key={c.id} content={c} />
                    )
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Trending;