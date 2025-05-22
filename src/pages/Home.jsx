import React from "react";
import Hero from "../components/Hero";
import TopRecipes from "../components/TopRecipes";
import Category from "../components/Category";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopRecipes />
      <Category />
      <NewsLetter />
    </div>
  );
};

export default Home;
