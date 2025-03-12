import { useState } from "react";

const Img = [
  {
    alt: "rhcp_mugshotleisurebu",
    src: "/rhcp_mugshotleisurebu.png",
    link: "https://shop.redhotchilipeppers.com/products/mugshot-leisure-button-up"
  },
  {
    alt: "rhcp_mugshotleisureshort",
    src: "/rhcp_mugshotleisureshort.png",
    link: "https://shop.redhotchilipeppers.com/products/mugshot-leisure-short"
  },
  {
    alt: "rhcp-hand-rug-red",
    src: "/rhcp-hand-rug-red.png",
    link: "https://shop.redhotchilipeppers.com/products/hand-tufted-asterisk-rug-red"
  },
];

const Window = () => {
  return (
    <div className="relative rounded-2xl items-center flex flex-col p-3 gap-1">
      <div className="flex flex-wrap gap-10 justify-center">
        {Img.map((image, index) => (
          <a target="_blank" href={image.link}>
            <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="object-cover w-56 h-56 cursor-pointer "
          />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Window;
