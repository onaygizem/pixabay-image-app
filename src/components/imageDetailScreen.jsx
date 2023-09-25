// ImageDetailScreen.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getImageById } from '../api/pixabay';
import styles from "./imageDetailScreen.module.css";

// Default user image URL
const defaultUserImageURL = '/assets/deafultUserImage.jpg';

function ImageDetailScreen() {
    const { imageId } = useParams();
    const [imageDetails, setImageDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch image details using the imageId from the URL
        async function fetchImageDetails() {
            try {
                const data = await getImageById(imageId);
                setImageDetails(data);
            } catch (error) {
                console.error('Error fetching image details:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchImageDetails();
    }, [imageId]);

    if (isLoading) {
        // Render loading state while fetching data
        return <p>Loading image details...</p>;
    }

    if (!imageDetails) {
        // Render an error message if image details cannot be fetched
        return <p>Error fetching image details.</p>;
    }

    const userImageURL = imageDetails.userImageURL || defaultUserImageURL;

    return (
        <div className={styles.imageDetailsContainer}>
            <div className={styles.userDetails}>
                <img src={userImageURL} alt={imageDetails.tags} />
                <h1>{imageDetails.user}</h1>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imagePreview}>
                    <img src={imageDetails.previewURL} alt={imageDetails.tags} />
                </div>
                <div className={styles.imageTags}>
                    <h2>Image tags</h2>
                    <p>{imageDetails.tags}</p>
                </div>
            </div>
        </div>
    );
}

export default ImageDetailScreen;