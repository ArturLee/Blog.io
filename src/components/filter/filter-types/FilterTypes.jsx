import "./FilterTypes.css";

/**
 *
 * @function FilterTypes this function will render the filters available for each type
 * [Cateogry, Projects]
 * @returns list of projects
 */
function FilterTypes({ title, items, onFilter }) {
  return (
    <div className="filter-types">
      <h2 className="title">{title}</h2>
      {items.length &&
        items.map((item) => {
          const select = () => onFilter(item);
          return (
            <p className="select" onClick={select} key={item.id}>
              {item.name || 'others'}
            </p>
          );
        })}
    </div>
  );
}

export default FilterTypes;
