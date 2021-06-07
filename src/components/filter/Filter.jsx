import React, { Fragment, PureComponent } from "react";
import FilterTypes from "./filter-types/FilterTypes";
import Publication from "../publication/Publication";
import "./Filter.css";

/**
 * @class Filter
 * @classdesc component to display filters by name, category or projects
 */

class Filter extends PureComponent {
  state = {
    title: "",
    filteredPublications: null,
    category: null,
  };

  onFilterProject = (value) => {
    const { publications } = this.props;
    const filtered = publications.filter(
      (item) => item.identifier.indexOf(value.identifier) >= 0
    );
    this.setState({ filteredPublications: filtered });
  };

  onFilterCategory = (value) => {
    console.log(value);
    const { publications } = this.props;
    const filtered = publications.filter(
      (item) => item.category === value.name
    );
    this.setState({ filteredPublications: filtered });
  };

  onChange = (value) => {
    this.setState({ title: value });
  };

  onTitleSearch = (value) => {
    const { publications } = this.props;
    const filtered = publications.filter(
      (item) => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
    );

    this.setState({ filteredPublications: filtered });
  };

  onKeyDown = (event) => {
    const { title } = this.state;
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      console.log("enter", title);
      event.preventDefault();
      this.onTitleSearch(title);
    }
  };

  render() {
    const { category, projects, publications } = this.props;
    const { title, filteredPublications } = this.state;
    console.log(category);
    return (
      <Fragment>
        <div className="filter">
          <h3>Filter publications</h3>
          <input
            type="text"
            className="input"
            placeholder="Search by title..."
            onChange={(e) => this.onChange(e.target.value)}
            value={title}
            onKeyDown={this.onKeyDown}
          />
          {category.length && (
            <FilterTypes
              title="Category"
              items={category}
              onFilter={this.onFilterCategory}
            />
          )}
          {projects.length && (
            <FilterTypes
              title="Project"
              items={projects}
              onFilter={this.onFilterProject}
            />
          )}
        </div>
        <Publication publications={filteredPublications || publications} />
      </Fragment>
    );
  }
}

export default Filter;
