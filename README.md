# chess-web-app
A web application for playing chess against AI and other online players.

Backend: Pyhon-Django

Frontend: React-js

The chessboard gui component used is [chessboardjsx](https://github.com/willb335/chessboardjsx).

The chess engine for the AI players is a javascript version of stockfish ([Stockfish-js](https://github.com/exoticorn/stockfish-js)).

Current features:

1. Logging in and out of web app.

2. Signing up with a username and password.

3. A home page shown after logging in that gives user the following options:

Play against AI (Enables user to play against 6 different levels of difficulty of the chess engine stockfish).

Show stats (Shows the player the their statistics: games played/ won/ lost + record of the previous games from the database).

Future features:

1. Playing against other online players (will be implemented using django channels (websockets))

2. Leaderboard.

