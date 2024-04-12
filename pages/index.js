import { useState } from 'react';
import PlayerInput from '../components/PlayerInput';
import PlayerList from '../components/PlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (name) => {
    setPlayers([...players, name]);
  };

  const handleEditPlayer = (index, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = newName;
    setPlayers(updatedPlayers);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="container mt-4">
      <h1>Add Players</h1>
      <PlayerInput onAddPlayer={handleAddPlayer} />
      <h2 className="mt-4">Player List</h2>
      <PlayerList
        players={players}
        onEditPlayer={handleEditPlayer}
        onRemovePlayer={handleRemovePlayer}
      />
    </div>
  );
};

export default Home;
