import React from 'react'
import '../../components/Loader/SkeletonLoader.css'

const SkeletonLoader = () => {
    return (
        <>
            <div className="skeleton-loader1"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader1"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader1"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div className="skeleton-loader"></div>
            <div style={{ display: "flex", height: "40vh", flexDirection: "column" }}>
                <div className="skeleton-loader2"></div>
            </div>

        </>
    )
}

export default SkeletonLoader