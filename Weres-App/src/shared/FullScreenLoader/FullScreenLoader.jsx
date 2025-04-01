import React from 'react';
import './FullScreenLoader.css';

const FullScreenLoader = ({ isLoading, message }) => {
    if (!isLoading) return null;

    return (
        <div className="fullscreen-loader">
            <div className="loader-spinner"></div>
            <p>{message ? message : 'Cargando...'}</p>
        </div>
    );
};

export default FullScreenLoader;