import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import { Descriptions } from "antd";
import Chart from "./chart";
import DownloadPDF from "./pdf";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [stats, setStats] = useState([]);
  const [image, setImage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("name");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (sortCriteria) => {
    setPokemons(
      [...pokemons].sort((a, b) => {
        if (sortCriteria === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortCriteria === "weight") {
          return a.weight - b.weight;
        }
        // add more sort criteria as required
      })
    );
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      color: "white",
    },
    height: 500,
    overlay: { backgroundColor: "grey" },
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const pokemons = res.data.results;
      setPokemons(pokemons);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOnePokemonStats = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const stats = response.data.stats;
      setImage(response.data.sprites.front_default);
      setStats(stats);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            Done
            <li>Implement React Loading and show it during API call</li>Done
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            done
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>{" "}
            done
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  console.log("pokemons", pokemons);
  console.log("pokemonDetail", pokemonDetail);
  console.log("stats", stats);
  console.log("any", image);

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>

            <div>
              <input type="text" value={searchTerm} onChange={handleSearch} />
              <select onChange={handleSort}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <br />
              <br />
              <b>
                {pokemons
                  .filter((obj) =>
                    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sortDirection === "asc") {
                      return a.name.localeCompare(b.name);
                    }
                    return b.name.localeCompare(a.name);
                  })
                  .slice(
                    currentPage * pokemonsPerPage,
                    (currentPage + 1) * pokemonsPerPage
                  )
                  .map((obj) => (
                    <p
                      onClick={() => {
                        getOnePokemonStats(obj?.url);
                        setPokemonDetail(obj);
                      }}
                      key={obj.name}
                      style={{ backgroundColor: "gray", cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "yellow";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "gray";
                      }}
                    >
                      {obj.name}
                    </p>
                  ))}
              </b>
            </div>
            <br />
            <button onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div>
            Requirement:
            <ul>
              <Descriptions column={2} bordered>
                <Descriptions.Item span={2}>
                  {image ? (
                    <img src={image} alt="Pokemon sprite" />
                  ) : (
                    <p>Loading...</p>
                  )}
                </Descriptions.Item>
                {stats?.map((obj) => {
                  return (
                    <>
                      <Descriptions.Item label="Base stat">
                        <p>{obj?.base_stat}</p>
                      </Descriptions.Item>

                      <Descriptions.Item label="Base name">
                        <p>{obj?.stat?.name}</p>
                      </Descriptions.Item>
                    </>
                  );
                })}
                <Descriptions.Item>
                  <DownloadPDF stats={stats} image={image} />
                </Descriptions.Item>

                <Descriptions.Item>
                  <Chart stats={stats} />
                </Descriptions.Item>
              </Descriptions>

              <li>
                show the sprites front_default as the pokemon image - done
              </li>
              <li>
                Show the stats details - only stat.name and base_stat is
                required in tabular format - done
              </li>
              <li>Create a bar chart based on the stats above - done</li>
              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PokeDex;
