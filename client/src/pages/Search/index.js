import React from "react";
import foods from "./foods";

export default function Search() {
  return (
    <div>
      {foods.map((food) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              padding: "0.75rem",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", columnGap: "0.5rem" }}>
              <img
                src={food.image_url}
                style={{ width: "80px", height: "60px", objectFit: "cover" }}
                alt={food.name}
              />

              <div>
                <span>{food.name}</span>
                <br />
                <span style={{ color: "rgbx(200,200,200)", fontSize: "10px" }}>
                  {food.description}
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>{food.price}</div>
          </div>
        );
      })}
    </div>
  );
}
