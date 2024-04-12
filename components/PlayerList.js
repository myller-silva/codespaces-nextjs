import { useState } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';

const PlayerList = ({ players, onEditPlayer, onRemovePlayer }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setEditedName(players[index]);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    onEditPlayer(selectedIndex, editedName);
    setShowEditModal(false);
    setSelectedIndex(null);
    setEditedName('');
  };

  return (
    <ListGroup>
      
      {players.map((player, index) => (
        <ListGroup.Item key={index}>
          {player}
          <div className="float-right">
            <Button variant="secondary" onClick={() => handleEdit(index)}>
              Edit
            </Button>{' '}
            <Button variant="danger" onClick={() => onRemovePlayer(index)}>
              Remove
            </Button>
          </div>
        </ListGroup.Item>
      ))}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Player Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editedPlayerName">
            <Form.Control
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </ListGroup>
  );
};

export default PlayerList;
