import React, { useState } from "react";
import style from "./style.module.css";
import image1 from "../../../assets/images/info/info-1.webp";
import image2 from "../../../assets/images/info/info-2.jpg";
import image3 from "../../../assets/images/info/info-3.jpg";

const infoData = [
  {
    image: image1,
    title: "Information about Bosnia",
    description:
      "Enjoy the beauty of nature, explore tourist attractions, learn about its history, and enjoy affordable prices in Bosnia",
    content: `
      1. Enchanting Nature: <br />
      From dense forests to green mountains and charming lakes, Bosnia and Herzegovina is a unique destination for nature lovers. It is characterized by stunning landscapes that attract visitors with their beauty and unique diversity.
      <br /><br />
      2. Ideal Weather:<br />
      The moderate weather in Bosnia provides an opportunity to explore tourist attractions throughout the year. Whether strolling through the streets of historic cities or enjoying the breathtaking views of lakes and mountains, you will find yourself in a world of natural beauty.
      <br /><br />
      3. Beautiful Tourist Attractions:<br />
      From the fortress of the city of Mostar to the waterfalls of Jajce, tourist destinations in Bosnia and Herzegovina are diverse. Enjoy a tour of the historic streets of Sarajevo and learn about the culture of the old town.
      <br /><br />
      4. Low Prices:<br />
      In terms of cost, your trip to Bosnia and Herzegovina is considered a simple investment for an unforgettable experience. Compared to other European countries, prices remain affordable, allowing visitors to explore all that this wonderful destination has to offer.
    `,
  },
  {
    image: image2,
    title: "Islam in Bosnia",
    description:
      "Enjoy the beauty of nature and spirituality in the heart of Europe! Discover the rich Islamic heritage in Bosnia and Herzegovina.",
    content: `
      Bosnia and Herzegovina hosts a rich Islamic heritage that reflects cultural and historical diversity. The magnificent mosques in its old cities reflect unique Islamic architecture and serve as centers for spirituality and contemplation. Visitors can enjoy the beauty of minarets and domes that harmonize beautifully with the stunning natural landscapes.
      <br />
      <br />
      Bosnia is characterized by an Islamic way of life embodied in its traditions and daily customs. People here enjoy delicious halal cuisine, and Bosnian hospitality reflects tolerance and warmth. Ramadan and Eid al-Fitr are considered two important occasions where residents experience unique religious and social experiences.
      <br />
      <br />
      Regarding the religious experience, mosques and the call to prayer (Adhan) are among the prominent features that distinguish Bosnia and Herzegovina. This adds a special spiritual charm to the urban environment.
    `,
  },
  {
    image: image3,
    title: "The history of Bosnia",
    description:
      "Bosnia and Herzegovina: A Journey through History of Resilience and Renewal Bosnia and Herzegovina shines as one of the unique tourist destinations in Europe with its rich and diverse history. This land of resilience reflects a journey of construction and renewal throughout the ages, where ancient history and different civilizations converge.",
    content: `
      The Formation and Ancient Civilizations: <br />
      The origins of Bosnia and Herzegovina date back to several ancient civilizations, including the Greeks, Romans, and Illyrians. The region witnessed diverse influences, giving it a rich cultural background.
      <br /><br />
      The Ottoman Era:<br />
      In the Middle Ages, Bosnia and Herzegovina were influenced by the Ottoman Empire, a period that lasted for a long time. The Ottoman Empire left its mark on architecture and culture, and some of these influences are still evident today.
      <br /><br />
      The Austro-Hungarian Period:<br />
      Bosnia and Herzegovina came under the rule of the Austro-Hungarian Empire in the 19th century, witnessing changes in administration and social structure. This period continued to influence the cultural identity of the region.
      <br /><br />
      World War I and II:<br />
      Bosnia and Herzegovina experienced the effects of both World Wars, enduring a difficult period of division and political changes. The economic and social structure was affected during this time.
      <br /><br />
      The Bosnian War:<br />
      The Bosnian Civil War (1992-1995) is considered a crucial period in the country's history. It witnessed wars and political transformations, but Bosnia and Herzegovina managed to rise and recover thanks to the will of the people and international support.
      <br /><br />
      The Present and Future:<br />
      The history of Bosnia and Herzegovina is filled with challenges and victories, and today the country remains a place that combines cultural diversity and rich heritage. With ongoing efforts for renewal and infrastructure development, the future of Bosnia and Herzegovina looks promising.
      <br /><br />
      Bosnia and Herzegovina offer visitors a unique opportunity to explore its exciting history and enjoy a travel experience with deep cultural significance.
    `,
  },
];

const InfoRow = (props) => {
  const {
    index,
    image,
    title,
    description,
    content,
    currentExpanded,
    setCurrentExpanded,
  } = props;
  const paragraphs = content.split("<br /><br />");
  const [expanded, setExpanded] = useState(false);
  const expaindCondition = expanded && currentExpanded === index;

  const toggleExpand = () => {
    if (expaindCondition) {
      setExpanded(false);
      setCurrentExpanded(null);
    } else {
      setExpanded(true);
      setCurrentExpanded(index);
    }
  };

  return (
    <div className={style.row}>
      <div className={style.image}>
        <img src={image} alt="" />
      </div>
      <div className={style.wrap}>
        <div className={style.content}>
          <div className={style.text}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <button
            onClick={toggleExpand}
            className={`${style.showMoreBtn} ${
              expaindCondition ? style.close : ""
            }`}
          >
            <span>{"More"}</span>
          </button>
          <div
            className={`${style.paragraph} ${style.big} ${
              expaindCondition ? style.show : ""
            }`}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                <br />
                {paragraph.split("<br />").map((par, i) => (
                  <React.Fragment key={i}>
                    {par}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = (props) => {
  const [currentExpanded, setCurrentExpanded] = useState(null);

  return (
    <div className={`newSection ${style.info}`}>
      <div className="container">
        {infoData.map((row, index) => (
          <InfoRow
            key={index}
            index={index}
            image={row.image}
            title={row.title}
            description={row.description}
            content={row.content}
            currentExpanded={currentExpanded}
            setCurrentExpanded={setCurrentExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
