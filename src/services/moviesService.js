/***
 * fall all movies
 * @returns {Promise<[]>}
 */
export const findAllMovies = () => {
  return fetch("/api/movies")
    .then(res => res.json())
    .then(data => data.movies);
};
/***
 * find movies by title
 * @param title
 * @returns {Promise<any>}
 */
export const findMovie = title => {
  return fetch(`/api/movies/${title}`)
    .then(res => res.json())
    .then(data => data.movie);
};
/***
 * create new movie entry
 * @param movie
 * @returns {Promise<void>}
 */
export const createMovie = movie => {
  return fetch(`/api/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  }).then(res =>
    res.ok ? console.log("add success") : console.log("add failed")
  );
};
/***
 * update movie details
 * @param title
 * @param movie
 */
export const updateMovie = (title, movie) => {
  fetch(`/api/movies/${title}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie: movie })
  })
    .then(res => res.json())
    .then(data => console.log("updated:", data));
};
/***
 * delete movie entry
 * @param title
 */
export const deleteMovie = title => {
  fetch(`/api/movies/${title}`, {
    method: "DELETE"
  })
    .then(res => (res.ok ? console.log("delete success!") : res.json()))
    .then(data => console.log(data));
};
/***
 * add actors
 * @param title
 * @param actor
 */
export const addActor = (title, actor) => {
  fetch(`/api/movies/${title}/actors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actor })
  }).then(res => res.ok && console.log("add success"));
};
/***
 * remove actors
 * @param title
 * @param actor
 */
export const removeActor = (title, actor) => {
  fetch(`/api/movies/${title}/actors`, { method: "DELETE" })
    .then(res => (res.ok ? console.log("actor delete success") : res.json()))
    .then(data => console.log(data));
};
