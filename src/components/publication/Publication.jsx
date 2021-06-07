import "./Publication.css";

/**
 *
 * @function Publication this will render all publications
 * @returns the publications component
 */
function Publication({ publications }) {
  return (
    <div className="publication">
      {publications.length ? (
        publications.map((publication) => {
          return (
            <div key={publication.id} className="card">
              <img src="https://picsum.photos/200" alt="img" />
              <div className="info">
                <h2 className="title">{publication.name}</h2>
                <p className="category">{publication.category}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="card">
          <h2 className="results">Nothing found.</h2>
        </div>
      )}
    </div>
  );
}

export default Publication;
