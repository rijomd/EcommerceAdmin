import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const LoadingSkeleton = () => {
    return (
        <div>
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#0d6efd38">
                <Skeleton height={200} />
                <Skeleton count={5} />
                <Skeleton  count={3}  height={50} />
            </SkeletonTheme>
        </div>

    );
}

{/* 
            <div>
                Using Count
                <div style={{ marginBottom: "20px" }}>
                    <Skeleton height={50} />
                </div>
                <Skeleton count={5} />
            </div> */}