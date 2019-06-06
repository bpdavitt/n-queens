/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  let board = new Board({n: n});
  // let row = board.get(0);
  let hasConflicts = false;
  let position = {
    'row': 0,
    'column': 0
  };
  while (position.row <= n - 1 && position.column <= n - 1) {
    board.togglePiece(position.row, position.column);
    hasConflicts = board.hasAnyRooksConflicts();
    if (hasConflicts) {
      board.togglePiece(position.row, position.column);
    } else {
      solution.push(board.get(position.row));
    }
    if (position.column === n - 1) {
      position.row++;
      position.column = 0;
    } else {
      position.column ++;
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, board, usedCol, row, solutions = []) {
  if ( n === 0 || n === 1 ) {
    return 1;
  }

  board = board || new Board({n: n});

  usedCol = usedCol || [];

  row = row || 0;

  for ( var i = 0; i <= n - 1; i++) {
    
    if (!usedCol.includes(i)) {
      board.togglePiece(row, i);

      if (row === n - 1) {
        
        if (!board.hasAnyRooksConflicts()) {
          var validBoard = board.rows();
          let constBoard = validBoard.slice(0);
          solutions.push(constBoard);
        }

        board.togglePiece(row, i);
        
        return solutions;
      }

      if (!board.hasAnyRooksConflicts()) {
        usedCol.push(i);
        countNRooksSolutions(n, board, usedCol, row + 1, solutions);
        usedCol.pop();
      }      
      board.togglePiece(row, i);                
    }
    if (i === n - 1 && row !== 0) {
      return solutions;
    }    
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, board, usedCol, row, solutions = []) {
  if ( n === 0 || n === 1 ) {
    return 1;
  }

  board = board || new Board({n: n});

  usedCol = usedCol || [];

  row = row || 0;

  for ( var i = 0; i <= n - 1; i++) {
    
    if (!usedCol.includes(i)) {
      board.togglePiece(row, i);

      if (row === n - 1) {
        
        if (!board.hasAnyQueensConflicts(row, i)) {
          var validBoard = board.rows();
          let constBoard = [];
          validBoard.forEach((row, index) => {
            constBoard[index] = [...row];
          });
          solutions.push(constBoard);
        }

        board.togglePiece(row, i);
        
        return solutions;
      }

      if (!board.hasAnyQueensConflicts(row, i)) {
        usedCol.push(i);
        countNQueensSolutions(n, board, usedCol, row + 1, solutions);
        usedCol.pop();
      }      
      board.togglePiece(row, i);                
    }
    if (i === n - 1 && row !== 0) {
      return solutions;
    }    
  }

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};
