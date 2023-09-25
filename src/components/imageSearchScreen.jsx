import React, { useState } from 'react';
import { searchImage } from '../api/pixabay.js'; // Import searchImage function from the api file

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
        <div>
            <h1>Image Search</h1>
            <input
                type="text"
                placeholder="Search for images"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress} // Call handleKeyPress on key press
            />
            <button onClick={handleSearch}>Search</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="image-list">
                    {images.map((image) => (
                        <img
                            key={image.id}
                            src={image.previewURL}
                            alt={image.tags}
                            onClick={() => {
                                // Handle image click (navigate to image detail screen, etc.)
                                console.log(`Image clicked: ${image.tags}`);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageSearchScreen;
