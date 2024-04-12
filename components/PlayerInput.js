import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PlayerInput = ({ onAddPlayer }) => {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '') {
      onAddPlayer(name);
      setName('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="playerName">
        <Form.Label>Player Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter player name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Player
      </Button>
    </Form>
  );
};

export default PlayerInput;
