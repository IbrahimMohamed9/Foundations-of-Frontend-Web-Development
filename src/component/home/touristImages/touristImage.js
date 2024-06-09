import React, { useRef, useEffect } from "react";
import MainTitle from "../../global/mainTitle/mainTitle";
import style from "./style.module.css";
import image1 from "../../../assets/images/tourist-places/tourist-places-1.jpg";
import image2 from "../../../assets/images/tourist-places/tourist-places-2.jpg";
import image3 from "../../../assets/images/tourist-places/tourist-places-3.jpg";
import image4 from "../../../assets/images/tourist-places/tourist-places-4.jpg";
import image5 from "../../../assets/images/tourist-places/tourist-places-5.jpg";
import image6 from "../../../assets/images/tourist-places/tourist-places-6.jpg";
import image7 from "../../../assets/images/tourist-places/tourist-places-7.jpg";
import image8 from "../../../assets/images/tourist-places/tourist-places-8.webp";
import image9 from "../../../assets/images/tourist-places/tourist-places-9.webp";
import image10 from "../../../assets/images/tourist-places/tourist-places-10.webp";
import image11 from "../../../assets/images/tourist-places/tourist-places-11.jpg";

const imagesList = [
  { id: "image1", src: image1 },
  { id: "image2", src: image2 },
  { id: "image3", src: image3 },
  { id: "image4", src: image4 },
  { id: "image5", src: image5 },
  { id: "image6", src: image6 },
  { id: "image7", src: image7 },
  { id: "image8", src: image8 },
  { id: "image9", src: image9 },
  { id: "image10", src: image10 },
  { id: "image11", src: image11 },
];

const TouristImages = () => {
  const imagesListRef = useRef(null);

  useEffect(() => {
    const duplicateImages = () => {
      const scrollerContent = Array.from(imagesListRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        imagesListRef.current.appendChild(duplicatedItem);
      });
    };

    duplicateImages();
  }, []);

  return (
    <div className={`newSection ${style.tourist}`}>
      <MainTitle title="Examples" />
      <div className="container">
        <div className={style.images}>
          <ul className={style.imagesList} ref={imagesListRef}>
            {imagesList.map((image) => (
              <li key={image.id}>
                <img src={image.src} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TouristImages;
