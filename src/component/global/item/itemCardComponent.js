import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./item.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#6c757d",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const ItemCard = ({ price, imgSrc, name, category }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: 170 }} style={{ margin: "0 10px" }}>
        <Box
          sx={{
            minHeight: "130px",
            maxHeight: "170px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={imgSrc}
            alt={category + " Image"}
            style={{ maxWidth: "100%" }}
          />
        </Box>

        <CardContent>
          <Typography variant="h6" align="center">
            {name}
          </Typography>
          <Typography variant="body2" align="center">
            Price: {price} KM/day
          </Typography>
        </CardContent>

        <CardContent>
          <button className={styles.itemBut}></button>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ItemCard;
