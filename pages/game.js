import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const GamePage = () => {
    // Array de papéis padrões
    const defaultRoles = [
        { funcao: 'Detetive', detalhes: ['Investigue e descubra o assassino'] },
        { funcao: 'Assassino', detalhes: ['Elimine os outros jogadores sem ser descoberto'] },
        { funcao: 'Vítima', detalhes: ['Cuidado para não ser eliminado'] },
        { funcao: 'Testemunha', detalhes: ['Ajude o detetive a identificar o assassino'] },
        { funcao: 'Cúmplice', detalhes: ['Proteja o assassino sem ser descoberto'] }
    ];

    const [players, setPlayers] = useState([]); // Array de jogadores
    const [roles, setRoles] = useState([]); // Array de papéis dos jogadores
    const [currentPlayer, setCurrentPlayer] = useState(0); // Índice do jogador atual
    const [showRole, setShowRole] = useState(false); // Estado para mostrar ou ocultar o papel do jogador
    const [playersViewedRole, setPlayersViewedRole] = useState(0);
    // Carregar jogadores do localStorage ao iniciar
    useEffect(() => {
        const storedPlayers = localStorage.getItem('players');
        if (storedPlayers) {
            const parsedPlayers = JSON.parse(storedPlayers);
            setPlayers(parsedPlayers);

            // Embaralhar e distribuir papéis
            const shuffledRoles = [...defaultRoles].sort(() => Math.random() - 0.5); // Embaralha os papéis padrões
            const selectedRoles = shuffledRoles.slice(0, parsedPlayers.length); // Seleciona os primeiros papéis após o embaralhamento
            setRoles(selectedRoles);
        }
    }, []);


    const handleViewRole = () => {
        setShowRole(true);
        setPlayersViewedRole(playersViewedRole + 1);
    };

    const handleNextPlayer = () => {
        if (playersViewedRole === players.length - 1) {
            // Se todos os jogadores já viram seus papéis, avança para o próximo estágio do jogo
            // Coloque aqui a lógica para avançar para o próximo estágio
            console.log('Avançar para o próximo estágio do jogo');
        } else {
            setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players.length);
            setShowRole(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Game Page</h1>
            <h2>Jogador Atual: {players[currentPlayer]}</h2>
            {!showRole && (
                <Button variant="primary" onClick={handleViewRole}>
                    Ver Papel
                </Button>
            )}
            {showRole && (
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        {roles[currentPlayer] && (
                            <Card.Title>Papel: {roles[currentPlayer].funcao}</Card.Title>
                        )}
                        <Card.Text>
                            <h4>Detalhes:</h4>
                            <ul>
                                {roles[currentPlayer] && roles[currentPlayer].detalhes.map((detalhe, index) => (
                                    <li key={index}>{detalhe}</li>
                                ))}
                            </ul>
                        </Card.Text>
                        <Button variant="success" onClick={handleNextPlayer}>
                            {playersViewedRole === players.length - 1 ?
                             <Link href="/proximo-estagio">Próximo Estágio</Link> 
                             :
                            'Concluir e Passar para o Próximo Jogador'}
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default GamePage;
