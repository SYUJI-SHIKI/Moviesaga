import FilterForm from "../../components/elements/Movie/FilterForm";
import React from "react";

const RandomMoviesPage = () => (
  <div>
    <FilterForm />
  </div>
);

RandomMoviesPage.noFilmBackground = true;
RandomMoviesPage.animationType = 'fadeIn';

export default RandomMoviesPage;
