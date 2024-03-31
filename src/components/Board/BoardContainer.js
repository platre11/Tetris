import React, { useState, useEffect } from 'react';
import {BoardContainerS,BoardContainerCube,Div} from './StyledBoard';
import PIECES from './Pieces';
const PIECE_COLORS = {
  I: 'cyan',
  L: 'blue',
  O: 'yellow',
  J: 'orange',
};

const ROWS = 20;
const COLUMNS = 10;

// Fonction pour créer le plateau de jeu initial
const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLUMNS).fill([0, 'clear']));

  const getRandomPiece = () => {
    const pieces = 'ILOJ';
    const randPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: PIECES[randPiece],
      color: PIECE_COLORS[randPiece],
      pos: { x: 0, y: 0 },
      collided: false,
    };
  };
    const initialPiece = getRandomPiece();

  // Composant principal du plateau de jeu
const BoardContainer = () => {

  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState(getRandomPiece());

  useEffect(() => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: COLUMNS / 2 - 2, y: 0 },
      collided: false,
    }));
  }, []);

  const drawPiece = (newBoard, { pos, piece, color }) => {
    // Il faut créer une copie profonde du plateau pour ne pas muter l'état précédent directement
    const updateBoard = newBoard.map(row => [...row]);
  
    // Dessiner la pièce sur le plateau
    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          updateBoard[y + pos.y][x + pos.x] = [1, color];
        }
      });
    });
  
    return updateBoard;
  };

  const move = ({ keyCode }) => {
    if (keyCode === 37) {
      // Gauche
      if (!checkCollision(player, board, { x: -1, y: 0 })) {
        updatePlayerPos({ x: -1, y: 0 });
      }
    } else if (keyCode === 39) {
      // Droite
      if (!checkCollision(player, board, { x: 1, y: 0 })) {
        updatePlayerPos({ x: 1, y: 0 });
      }
    } else if (keyCode === 40) {
      // Bas
      dropPlayer();
    }
  };

  const dropPlayer = () => {
    // Cette fonction sera appelée lorsque l'utilisateur appuie sur la flèche du bas
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // S'il y a collision, on doit fixer la pièce et en créer une nouvelle
      if (player.pos.y < 1) {
        console.log("Game Over");
        // Ici, vous pouvez gérer la fin du jeu
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      setBoard(prev => drawPiece(prev, player));
      setPlayer(getRandomPiece());
    }
  };
  
  useEffect(() => {
    document.addEventListener('keydown', move);
    return () => {
      document.removeEventListener('keydown', move);
    };
  }, [player, board]);

  // Fonction pour obtenir une pièce aléatoire 

  // Fonction pour obtenir une pièce aléatoire
  const randomPiece = () => {
    const pieces = 'ILOJ';
    const randPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return { shape: PIECES[randPiece], color: 'red' }; 
  };

  // Fonction pour définir la position de départ de la pièce
  const startPosition = () => {
    const newPiece = randomPiece();
    return {
      pos: { x: COLUMNS / 2 - 2, y: 0 },
      piece: newPiece.shape,
      color: newPiece.color, 
    };
  };

    // Effet pour gérer le mouvement de la pièce vers le bas
    useEffect(() => {
      const drop = () => {
        console.log('Tentative de déplacer la pièce vers le bas');
        if (!checkCollision(player, board, { x: 0, y: 1 })) {
          updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
          console.log('Collision détectée, mise à jour du plateau');
          // S'il y a collision, on doit fixer la pièce et en créer une nouvelle
          if (player.pos.y < 1) {
            console.log("Game Over");
            // Ici, vous pouvez gérer la fin du jeu
          }
          updatePlayerPos({ x: 0, y: 0, collided: true });
          setBoard(prev => drawPiece(prev, player));
          setPlayer(getRandomPiece());
        }
      };
  
      const keyUp = ({ keyCode }) => {
        if (keyCode === 40) {
          // Arrêter de descendre la pièce quand l'utilisateur relâche la flèche du bas
        }
      };
  
      const dropTimer = setInterval(drop, 1000);
  
      // Ajoutez les événements pour gérer les contrôles ici si nécessaire
  
      return () => {
        clearInterval(dropTimer);
      };
    }, [player, board]);

// Fonction pour vérifier les collisions de la pièce avec le plateau de jeu
const checkCollision = (player, board, { x: moveX, y: moveY }) => {
  if (player?.piece) { 
    for (let y = 0; y < player.piece.length; y++) {
        for (let x = 0; x < player.piece[y].length; x++) {
            if (player.piece[y][x] !== 0) {
                if (
                    !board[y + player.pos.y + moveY] ||
                    !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true;
                }
            }
        }
    }
    return false;
  }};
const updatePlayerPos = ({ x, y, collided }) => {
  setPlayer(prev => ({
    ...prev,
    pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
    collided,
  }));
};
  // Rendu du plateau de jeu
  return (
    <Div>
      <BoardContainerS>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <BoardContainerCube
              key={`${y}-${x}`}
              color={cell[1] === 'clear' ? undefined : cell[1]}
            />
          ))
        )}
      </BoardContainerS>
    </Div>
  );
};

export default BoardContainer;
