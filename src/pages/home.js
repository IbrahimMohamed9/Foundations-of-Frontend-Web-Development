import React from "react";
import HomeVideo from "../component/home/video/video";
import ItemCard from "../component/global/item/itemCardComponent.js";
import package10 from "../assets/images/package/en/package-10.jpg";
import Grid from "@mui/joy/Grid";
import Info from "../component/home/info/info";
import MainTitle from "../component/global/mainTitle/mainTitle";
import TouristImages from "../component/home/touristImages/touristImage";

const items = [
  {
    id: "12",
    imgSrc: package10,
    price: "55",
    category: "Package",
    name: "10 Day ",
  },
  {
    id: "1",
    imgSrc: package10,
    price: "55",
    category: "Package",
    name: "10 Day ",
  },
];

const Home = () => {
  return (
    <>
      <HomeVideo />
      <div className="container newSection">
        <MainTitle title="New Package" />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "-30px", rowGap: "15px" }}
        >
          {items.map((item) => (
            <ItemCard
              key={item.id}
              imgSrc={item.imgSrc}
              price={item.price}
              category={item.category}
              name={item.name}
            />
          ))}
        </Grid>
      </div>
      <Info />
      <TouristImages />
    </>
  );
};

export default Home;
