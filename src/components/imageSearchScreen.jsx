import React, { useState, useEffect } from 'react';
import { searchImage } from '../api/pixabay.js'; // Import searchImage function from the api file
import styles from "./imageSearchScreen.module.css";
import { Link } from 'react-router-dom';


function ImageSearchScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTermAtEnter, setSearchTermAtEnter] = useState('');


    const mainContainerStyle = searchTermAtEnter === '' ?
        {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        } :
        {
            position: "relative",
            overflow: "hidden"
        };



    useEffect(() => {
        const storedSearchTerm = sessionStorage.getItem('searchTerm');
        const storedImageData = sessionStorage.getItem('imageData');

        if (storedSearchTerm && storedImageData) {
            const parsedData = JSON.parse(storedImageData);
            setImages(parsedData);
            setSearchTerm(storedSearchTerm);
            setSearchTermAtEnter(storedSearchTerm)
        }
    }, []);

    useEffect(() => {
        // Add an event listener for beforeunload
        window.addEventListener('beforeunload', clearStoredData);

        // Clear stored data when the component unmounts (e.g., when navigating away)
        return () => {
            window.removeEventListener('beforeunload', clearStoredData);
        };
    }, []);

    const clearStoredData = () => {
        sessionStorage.removeItem('searchTerm');
        sessionStorage.removeItem('imageData');
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            // If the search term is empty, clear the images
            setImages(null);
            setSearchTermAtEnter('');
            return;
        } else {
            setSearchTermAtEnter(searchTerm);
        }

        setIsLoading(true);

        clearStoredData();

        try {
            const data = await searchImage(searchTerm);

            if (data) {
                if (data.hits.length !== 0) {
                    // Handle when there are results
                    setImages(data.hits);

                    // Store the search term in sessionStorage
                    sessionStorage.setItem('searchTerm', searchTerm);

                    // Store the image data in sessionStorage
                    sessionStorage.setItem('imageData', JSON.stringify(data.hits));
                } else {
                    // Handle when no results are returned
                    setImages([]);
                }
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        // Check if the Enter key (key code 13) was pressed
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={mainContainerStyle}>
            <div className={styles.searchBarWrapper}>
                <div className={styles.search}>
                    <input
                        className={styles.searchText}
                        type="text"
                        name=""
                        placeholder="Search for images"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress} // Call handleKeyPress on key press
                    />
                    <a className={styles.searchBtn} href="#" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </a>
                </div>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.imageList}>
                    {images && images.length === 0 ? (
                        <p>No hits found.</p>
                    ) : (
                        images && images.map((image) => {
                            return (
                                <Link to={`/${image.id}`} key={image.id}>
                                    <div className={styles.imageWrapper}>
                                        <img src={image.previewURL} alt={image.tags} />
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

export default ImageSearchScreen;
