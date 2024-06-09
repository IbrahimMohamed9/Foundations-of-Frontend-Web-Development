import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import styles from "./item.module.css";

const ItemCard = ({ price, imgSrc, name, category }) => {
  return (
    <Card sx={{ width: 170 }} size="sm" style={{ margin: "0 10px" }}>
      <AspectRatio minHeight="130px" maxHeight="170px">
        <img src={imgSrc} alt={category + " Image"} />
      </AspectRatio>

      <div>
        <Typography level="title-lg" align="center">
          {name}
        </Typography>
        <Typography level="body-sm" align="center">
          Price: {price} KM/day
        </Typography>
      </div>

      <CardContent orientation="horizontal">
        <button className={styles.itemBut}></button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
