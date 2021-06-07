import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./filter/Filter";
import { getProjects, getToken, getAllPublications } from "../services/api";

function App() {
  const [projects, setProjects] = useState({});
  const [publications, setPublications] = useState({});
  const [category, setCategory] = useState({});

  useEffect(() => {
    getToken().then(({ access_token }) => {
      // we get all publications in one time, so we don't need to make multiple requests.
      getAllPublications(access_token).then((res) => {
        setPublications(res);

        // since most of the publication don't have indetifier, I create a filter for category.
        // this will also countribute to less api requests.
        const allCategory = [];
        res.map(
          (publication) =>
            allCategory.indexOf(publication.category) < 0 &&
            allCategory.push(publication.category)
        );

        // this will reduce all categories into array of objects, will be usefull to create the filters
        const categories = allCategory.reduce((categoryList, name, index) => {
          categoryList.push({ id: index, name });
          return categoryList;
        }, []);

        setCategory(categories);
      });

      // get projects will retrive all projects and we use in the filter
      getProjects(access_token).then(
        (res) => res && setProjects(res._embedded.title)
      );
    });
  }, []);

  return (
    <div className="App">
      <Filter
        category={category}
        projects={projects}
        publications={publications}
      />
    </div>
  );
}

export default App;
