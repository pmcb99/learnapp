import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type FallbackImageProps = {
  src: string;
  alt: string;
  fallbackSrc: string;
  width?: number;
  height?: number;
};

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  fallbackSrc,
  width = 500, // Default width if not provided
  height = 300, // Default height if not provided
}) => {
    const [imgSrc, setImgSrc] = useState<string>(src);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Start the border animation when the component mounts
        setIsLoaded(true);
    }, []);

    const handleError = () => {
        setImgSrc(fallbackSrc);
    };

    return (
        <div className={`relative overflow-hidden ${isLoaded ? 'ring-opacity-100' : 'ring-opacity-0'} transition-all duration-500 ease-in-out`}>
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent white to-transparent ring-4 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
            <Image
                src={imgSrc}
                alt={alt}
                className={`rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleError}
                width={width}
                height={height}
                unoptimized // Use this prop if you want to handle image optimization manually
            />
        </div>
    );
};

export default FallbackImage;
