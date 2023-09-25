import React, { useState } from 'react';
import { searchImage } from '../api/pixabay.js'; // Import searchImage function from the api file
import styles from "./imageSearchScreen.module.css";
import { Link } from 'react-router-dom';


function ImageSearchScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            // If the search term is empty, clear the images
            setImages([]);
            return;
        }

        setIsLoading(true);

        try {
            const data = await searchImage(searchTerm);

            if (data) {
                setImages(data.hits);
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
        <div className={styles.mainContainer}>
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
                    {images.map((image) => {
                        // console.log(image);

                        return (
                            <Link to={`/${image.id}`}>
                                <div className={styles.imageWrapper} key={image.id}>
                                    <img
                                        src={image.previewURL}
                                        alt={image.tags}
                                        onClick={() => {
                                            // Handle image click (navigate to image detail screen, etc.)
                                            console.log(`Image clicked: ${image.tags}`);
                                        }}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default ImageSearchScreen;
