import { SlideFrame } from '../SlideFrame';

interface ImageSlideProps {
  imageSrc: string;
  caption?: string;
  overlay?: boolean;
}

export function ImageSlide({ imageSrc, caption, overlay = true }: ImageSlideProps) {
  return (
    <SlideFrame backgroundType="image" backgroundValue={imageSrc}>
      {/* Overlay for better text readability */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
      
      {/* Caption */}
      {caption && (
        <div className="absolute bottom-16 left-0 right-0 text-center z-10">
          <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg px-8">
            {caption}
          </p>
        </div>
      )}
    </SlideFrame>
  );
}
