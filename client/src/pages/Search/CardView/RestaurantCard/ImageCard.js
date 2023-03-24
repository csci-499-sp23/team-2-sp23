const classes = {
  imageCard: {
    width: "50px",
    height: "100%",
    objectFit: "cover",
  },
};

function ImageCard({ src }) {
  return <img src={src} style={classes.imageCard} alt={src} />;
}

export default ImageCard;
