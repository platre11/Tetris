import React, { useState, useEffect } from 'react';
import {BoardContainerS,BoardContainerCube,Div} from './StyledBoard';
import PIECES from './Pieces';
const PIECE_COLORS = {
    I: 'green',
    L: 'blue',
    O: 'yellow',
    J: 'orange',
  };
const createBoard = (ROWS, COLUMNS) => Array.from({ length: ROWS }, () => Array(COLUMNS).fill([0, 'clear']));


const getRandomPiece = () => {
    const pieces = 'ILOJ';
    const randPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
        shape: PIECES[randPiece],
        color: PIECE_COLORS[randPiece], 
    };
};
  const initialPiece = getRandomPiece(); 

const BoardContainer = () => {
  const ROWS = 20;
  const COLUMNS = 10;
  const [board, setBoard] = React.useState(createBoard(ROWS, COLUMNS));
  const [currentPiece, setCurrentPiece] = useState(initialPiece);

  useEffect(() => {
    setCurrentPiece({...currentPiece, position: {x: 5, y: 0}});
  }, []);

  const randomPiece = () => {
    const pieces = 'ILOJ';
    const randPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return { shape: PIECES[randPiece], color: 'red' }; 
  };

  const startPosition = () => {
    const newPiece = randomPiece();
    return {
      pos: { x: COLUMNS / 2 - 2, y: 0 },
      piece: newPiece.shape,
      color: newPiece.color, 
    };
  };
  const [player, setPlayer] = React.useState(startPosition());

  React.useEffect(() => {
    const moveDown = () => {
        setPlayer(prev => {
          const newPos = { ...prev.pos, y: prev.pos.y + 1 };
          return { ...prev, pos: newPos };
        });
      };
  
    const dropTimer = setInterval(() => {
      // Vérifier si la pièce actuelle peut descendre plus bas
      if (!checkCollision(player, board, { x: 0, y: 1 })) {
        moveDown();
      } else {
        // Si la pièce ne peut plus descendre, il faut la placer et en créer une nouvelle
        setBoard(prev => drawPiece(prev, player));
        setPlayer(startPosition());
      }
    }, 1000);
    return () => clearInterval(dropTimer);
  }, [player, board]);

  const drawPiece = (newBoard, player) => {
    const updatedBoard = newBoard.map(row => [...row]);
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                if (player.pos.y + y < updatedBoard.length && player.pos.x + x < updatedBoard[0].length) {
                    updatedBoard[player.pos.y + y][player.pos.x + x] = ['1', player.color]; // Utilise la couleur du joueur
                }
            }
        });
    });
    return updatedBoard;
};

const checkCollision = (player, board, { x: moveX, y: moveY }) => {
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
};
  
  return (
    <Div>
        <BoardContainerS>
            {board.map((row, rowIndex) => row.map((cell, cellIndex) => (
                <BoardContainerCube
                    key={`${rowIndex}-${cellIndex}`}
                    color={cell[1] !== 'clear' ? cell[1] : undefined}
                />
            )))}
        </BoardContainerS>
    </Div>
  );
};

export default BoardContainer;
