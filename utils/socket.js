import io from 'socket.io-client';

const socket = io('https://market-whales-ynmr.onrender.com');

socket.on('connect', () => {
  console.log('Socket server connected');
});

export default socket;
