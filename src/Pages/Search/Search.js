import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useEffect } from 'react';
import SingleContent from '../../Components/SingleContent/SingleContent';
import CustomPagination from '../../Components/CustomPagination/CustomPagination';

const Search = () => {

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState();
    const [numberOfPage, setNumberOfPage] = useState();
    const [content, setContent] = useState([]);

    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: "#fff",
            },
        },
    });

    const fetchSearch = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)

        setContent(data.results);
        setNumberOfPage(data.total_pages);
        console.log(data.results);
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page])

    return (
        <div >
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        label="Search"
                        className="searchBox"
                        variant="filled"
                        style={{ flex: 1 }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch}> <SearchIcon /> </Button>
                </div>

                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: "5px" }}
                >
                    <Tab label="Search Movies" style={{ width: "50%" }} />
                    <Tab label="Search TV Series" style={{ width: "50%" }} />
                </Tabs>
            </ThemeProvider>
            <div className="trendingContent">
                {
                    content && content.map((c) =>
                        <SingleContent key={c.id} content={c} />
                    )
                }
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {
                numberOfPage > 1 && <CustomPagination setPage={setPage} numberOfPages={numberOfPage} />
            }
        </div>
    );
};

export default Search;