import { useState, useEffect } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/tour-dates-slide-3.jpg", alt: "IMG 1", span: "col-span-2" },
    { src: "/tour-dates-slide-2-john.jpg", alt: "IMG 2", span: "" },
    { src: "/tour-dates-slide-4-anthony.jpg", alt: "IMG 3", span: "", extraClass: "object-top" },
    { src: "/tour-dates-slide-5-new.jpg", alt: "IMG 4", span: "" },
    { src: "/tour-dates-slide-7.jpg", alt: "IMG 6", span: "row-span-2" },
    { src: "/tour-dates-slide-6.jpg", alt: "IMG 5", span: "" },
    { src: "/tour-dates-slide-8-new.jpg", alt: "IMG 7", span: "col-span-2" },
  ];

  // bloq y desbloq al abrir img
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-screen-lg mx-auto p-5 [&_img]:rounded-md [&_img]:w-full [&_img]:cursor-pointer [&_img]:object-cover [&_img]:h-40">
      <div className="grid grid-cols-3 gap-2 col-span-3">
        <div className={images[0].span}>
          <img src={images[0].src} alt={images[0].alt} onClick={() => setSelectedImage(images[0])} />
        </div>
        <div>
          <img src={images[1].src} alt={images[1].alt} onClick={() => setSelectedImage(images[1])} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 col-span-3 max-md:flex max-md:flex-col">
        {images.slice(2, 5).map((image, index) => (
          <div key={index} className={image.span}>
            <img src={image.src} alt={image.alt} className={image.extraClass || ""} onClick={() => setSelectedImage(image)} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 col-span-3">
        <div>
          <img src={images[5].src} alt={images[5].alt} onClick={() => setSelectedImage(images[5])} />
        </div>
        <div className={images[6].span}>
          <img src={images[6].src} alt={images[6].alt} onClick={() => setSelectedImage(images[6])} />
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-pink-200/50 backdrop-blur-xs flex justify-center items-center p-5 transition-opacity duration-100 opacity-0 animate-fadeIn" 
          onClick={() => {
            const modal = document.querySelector('.animate-zoomIn');
            modal.classList.replace('animate-zoomIn', 'animate-zoomOut');
            setTimeout(() => setSelectedImage(null), 100);
          }}
        >
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            className="rounded-lg transition-transform duration-100 scale-75 animate-zoomIn" 
            style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
          />
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out forwards;
          }
          @keyframes zoomIn {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
          }
          .animate-zoomIn {
            animation: zoomIn 0.2s ease-in-out forwards;
          }
          @keyframes zoomOut {
            from { transform: scale(1); }
            to { transform: scale(0.5); opacity: 0; }
          }
          .animate-zoomOut {
            animation: zoomOut 0.2s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
