function RestaurantPreview({ restaurant }) {
  return (
    <div style={{ height: "160px", width: "100%", backgroundColor: "gray" }}>
      {restaurant.name}
    </div>
  );
}

export default RestaurantPreview;
