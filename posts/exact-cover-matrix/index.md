---
title: Exact Cover Matrix
layout: post
date: 2020-10-19
description: Implementing doubly-linked lists.
tags:
- Algorithms
---

I first posted about Donald Knuth and Dancing Links in August, in this post I will cover implementation details and 
demonstrate the power of his algorithm. 
In this example we will cover how his Algorithm can be used to solve a Sudoku puzzle as an Exact Cover problem. 

To start with, this post covers how we can produce the Exact Cover matrix which represents our Sudoku puzzle and in doind that 
also cover pieces of that process from the `Board`, `Nodes` and `ColumnNode`. 


### Sudoku Board 

First, lets create a representation of the Sudoku board and by extension an individual square. 

```csharp

  public class BoardSquare
  {
      private int _value;
      private readonly int _row;
      private readonly int _column;

      public BoardSquare(int row, int column, int value)
      {
          _value = value;
          _row = row;
          _column = column;
      }

      public int GetValue() => _value;

      public int GetRowIndex() => _row;

      public int GetColumnIndex() => _column;

      public void SetValue(int value) => _value = value;

      public bool IsEmpty() => _value == 0;

      public override string ToString() => _value == 0 ? " " : _value.ToString();
  }

```

The `BoardSquare` object allows us to reason about the board, setting its value based on its position. And when we look at 
our grid, it can be seen as a collection of squares.

Our `Board` can then be represented as a two dimensional array; `BoardSquare[,]`. The `Board` class then implements the 
following methods. I won't go into detail here, You can see what's implementedin 
[Board.cs](https://github.com/pratikthanki/Revlos/blob/master/Revlos/Board.cs).

```csharp

  public class Board
  {
      private readonly BoardSquare[,] _board;

      private static BoardSquare[,] BuildBoard(string str)
      {...}

      public BoardSquare GetBoardSquare(int row, int column)
      {...}

      public void SetBoardSquare(int row, int column, int value);
      {...}

      public int GetSize();
      {...}

      public void PrintBoard()
      {...}
  }

```

_Note: We build the board from a single string, with zeros denoting empty squares. 
See [TestPuzzles.cs](https://github.com/pratikthanki/Revlos/blob/master/Revlos/TestPuzzles.cs) for examples puzzles._


### Link Nodes

Now, we get to the fun stuff. As I mentioned in my initial post the power of Algorithm X stems in how we implement the 
doubly-linked list. To do this we must first create a representation of a Node.

As Donald Knuth highlights, like a linked-list at any given Node we have "pointers" to the next and previous node. What makes 
doubly-linked list so interesting is that this is extended such that we have a quadruple-chained data structure with refereces 
to `Left`, `Rigth`, `Up` and `Down` positions. 

We can leverage generics, which introduces the concept of a type parameter `T` to our `LinkNode`.

```csharp

  internal class LinkNode<T>
  {
      public LinkNode(int index)
      {
          Index = index;
      }

      public void RemoveVertical()
      {
          Up.Down = Down;
          Down.Up = Up;

          ColumnNode.DecrementSize();
      }

      public void RemoveHorizontal()
      {
          Right.Left = Left;
          Left.Right = Right;
      }

      public void ReplaceVertical()
      {
          Up.Down = this;
          Down.Up = this;

          ColumnNode.IncrementSize();
      }

      public void ReplaceHorizontal()
      {
          Right.Left = this;
          Left.Right = this;
      }

      public LinkNode<T> Left { get; set; }

      public LinkNode<T> Right { get; set; }

      public LinkNode<T> Up { get; set; }

      public LinkNode<T> Down { get; set; }

      public ColumnNode<T> ColumnNode { get; set; }

      public int Index { get; }
  }

```

In developing our doubly-linked list we account for the number of squares (9) and the constraints (4) we need to satisfy. 
1. the square value (commonly 1-9)
2. rows
3. columns
4. "subboard"

Which means we will have a doubly-linked list of length; `9 * 9 * 4 = 324`.

### Column Nodes 

We also implement a `ColumnNode` to represent our `Header` node create the circular doubly-linked list in the vertical 
direction too.

```csharp

  internal class ColumnNode<T> : LinkNode<T>
  {
      internal void IncrementSize() => Size++;
      
      internal void DecrementSize() => Size--;

      public int Size { get; private set; }

      public ColumnNode() : base(-1)
      {
          Up = this;
          Down = this;
          ColumnNode = this;
      }
  }

```

### Initializing the Matrix

We're now set-up to create a representation of a doubly-linked list with our `LinkNode` and `ColumnNode` classes. For any 
given Sudoku we want to define a matrix of ones-and-zeros that show satisfies constraints.

First, this is our method to set matrix values, a list of length `9 * 9 * 4` of `bool`'s;

```csharp

  private void SetMatrixValues(IList<bool> mRow, BoardSquare boardSquare)
  {
      var row = boardSquare.GetRowIndex();
      var column = boardSquare.GetColumnIndex();
      var value = boardSquare.GetValue() - 1;

      int RegionIndex()
      {
          var regionSize = (int) Math.Sqrt(size);
          var regionNum1 =
              (int) Math.Floor(row / (double) regionSize) * regionSize +
              (int) Math.Floor(column / (double) regionSize);
          return regionNum1;
      }

      // In order, sets of 81 indexes 
      var positionConstraint = row * size + column;
      var rowConstraint = size * size + row * size + value;
      var columnConstraint = size * size * 2 + column * size + value;
      var regionConstraint = size * size * 3 + RegionIndex() * size + value;

      // Initialize matrix where the constraint is satisfied
      mRow[positionConstraint] = true;
      mRow[rowConstraint] = true;
      mRow[columnConstraint] = true;
      mRow[regionConstraint] = true;
  }

```

This helper method can then be used in deriving the Exact Cover matrix based off the Sudoku puzzle.

We can loop through each square, with squares that include values we want to update our matrix and state the constraints 
have been satisfied in that position and the square value. For empty squares we iterate all available squares.


```csharp

  private (DoublyLinkedList<bool> linkedList, List<BoardSquare> squares) CalculateMatrix()
  {
      var matrix = new List<bool[]>();
      var squares = new List<BoardSquare>();

      for (var row = 0; row < size; row++)
      {
          for (var column = 0; column < size; column++)
          {
              var boardSquare = _board.GetBoardSquare(row, column);
              if (boardSquare.IsEmpty())
              {
                  for (var value = 1; value <= size; value++)
                  {
                      var square = new BoardSquare(row, column, value);

                      matrix.Add(new bool[listLength]);
                      SetMatrixValues(matrix.Last(), square);
                      squares.Add(square);
                  }

                  continue;
              }

              matrix.Add(new bool[listLength]);
              SetMatrixValues(matrix.Last(), boardSquare);
              squares.Add(boardSquare);
          }
      }

      var linkedList = new DoublyLinkedList<bool>(listLength);
      linkedList.ProcessMatrix(matrix);

      return (linkedList, squares);
  }

```

In the next part of this post, we will look at how to solve the Sudoku using the linkedList created from the `CalculateMatrix()`
method. You can find all the code on [GitHub](https://github.com/pratikthanki/Revlos).

Thanks for taking the time to read this chunky post. It took me nearly two-months of on-and-off time to implement and understand
Algorithm X. If you have any questions feel free to reach out.
