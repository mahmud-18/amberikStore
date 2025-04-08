import {
  useLazyImage,
  ImageErrorBoundary,
  optimizeImageUrl,
} from "@/app/utils/imageOptimization";

const OptimizedImage = ({
  src,
  alt,
  width = 800,
  quality = 75,
  className = "",
  containerClassName = "",
  showLoadingIndicator = true,
}) => {
  const [imageSrc, isLoaded] = useLazyImage(
    optimizeImageUrl(src, { width, quality }),
    "/images/placeholder.svg"
  );

  return (
    <div className={`relative ${containerClassName}`}>
      <ImageErrorBoundary
        src={imageSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        fallback="/images/error-placeholder.svg"
      />
      {showLoadingIndicator && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
