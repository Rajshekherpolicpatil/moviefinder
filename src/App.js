import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState({});
  const [movieName, setMovieName] = useState("the king");
  const [initialValue, setInitialValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=1384dd65&t=${movieName}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [movieName]);
  console.log(movieName);
  console.log(data);

  return (
    <div className="container">
      <div className="inputbox">
        <input
          type="text"
          placeholder="Enter movie name"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
        />
        <button onClick={() => setMovieName(initialValue)}>Submit</button>
      </div>

      {data.Response === "True" && !error ? (
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tbody>
              <tr>
                <th>Movie name:</th>
                <td> {data?.Title ?? "no title"}</td>
              </tr>
              <tr>
                <th>poster</th>
                <td>
                  <img src={data?.Poster} alt="movie poster"></img>
                </td>
              </tr>
              <tr>
                <th>Released date : </th>
                <td>{data.Released ?? "no release date"}</td>
              </tr>
              <tr>
                <th>Ratings:</th>
                <td>{data?.Ratings[0]?.Value ?? "no rating"}</td>
              </tr>
              <tr>
                <th>Writer:</th>
                <td>{data?.Writer}</td>
              </tr>
            </tbody>
          </thead>
        </table>
      ) : (
        <h1>this movie is not created yet</h1>
      )}
    </div>
  );
}
