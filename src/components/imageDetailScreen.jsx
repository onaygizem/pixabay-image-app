// ImageDetailScreen.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ImageDetailScreen() {
    const { imageId } = useParams();
    const [imageDetails, setImageDetails] = useState(null);

    useEffect(() => {
    }, [imageId]);

    if (!imageDetails) {
        return <p>Loading image details...</p>;
    }

    return (
        <div>
            {/* Render image details */}
            <h1>Image Details</h1>
            <img src={imageDetails.imageUrl} alt={imageDetails.tags} />
        </div>
    );
}

export default ImageDetailScreen;