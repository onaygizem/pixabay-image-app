// ImageDetailScreen.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getImageById } from '../api/pixabay';
import styles from "./imageDetailScreen.module.css";
import { Link } from 'react-router-dom';

// Default user image URL
const defaultUserImageURL = '/assets/deafultUserImage.jpg';

function ImageDetailScreen() {
    const { imageId } = useParams();
    const [imageDetails, setImageDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchImageDetails() {
            try {
                const data = await getImageById(imageId);
                setImageDetails(data);
            } catch (error) {
                console.error('Error fetching image details:', error);
                setError('Error fetching image details. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchImageDetails();
    }, [imageId]);

    if (isLoading) {
        return <p>Loading image details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!imageDetails) {
        return <p>No image details available.</p>;
    }

    const userImageURL = imageDetails.userImageURL || defaultUserImageURL;

    return (
        <div className={styles.imageDetailsContainer}>
            <div className={styles.imageDetailsContainerHeading}>
                <div className={styles.userDetails}>
                    <img src={userImageURL} alt={`${imageDetails.user}'s profile`} />
                    <h1>{imageDetails.user}</h1>
                </div>
                <Link to={`/`}>
                    <div className={styles.closeButtonContainer}>
                        <button aria-label="Close">x</button>
                    </div>
                </Link>
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

