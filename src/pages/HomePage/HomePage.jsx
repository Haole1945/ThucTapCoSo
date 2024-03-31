import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
const HomePage = () => {
  const arr = ["1", "2", "3"];
  return (
    <div style={{ pading: "0 120px" }}>
      <wrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
      </wrapperTypeProduct>
      HomePage
    </div>
  );
};
export default HomePage;
