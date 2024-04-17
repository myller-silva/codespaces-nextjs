import { useState, useEffect } from 'react';
import PlayerInput from '../components/PlayerInput';
import PlayerList from '../components/PlayerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

const Home = () => {
  const [players, setPlayers] = useState([]);

  // Carregar jogadores do localStorage ao iniciar
  useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  // Salvar jogadores no localStorage sempre que o array de jogadores for atualizado
  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

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

      {players.length >= 5 && (
        <Link href="/game" className="btn btn-primary mt-4">
          Iniciar Jogo
        </Link>
      )}

    </div>
  );
};

export default Home;
