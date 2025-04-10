import { useEffect, useRef } from 'react';
import { SocketFlyweight } from '../services/socket/socket';
export const useStreamViewer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const peerRef = useRef<RTCPeerConnection | null>(null);
  const socket = useRef(SocketFlyweight.getSocket('/videostream'));
  useEffect(() => {
    // Listen for the broadcaster's announcement
    socket.current.connect();
    // socket.emit('joinRoom', )
    if (!canvasRef.current) {
      console.error('Canvas reference is not defined');
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    socket.current.on('video-frame', (frameData) => {
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0);
      };
      image.src = frameData;
    });
    // Cleanup on unmount
    return () => {
      // socket.current.off('broadcaster');
      // socket.current.off('offer');
      socket.current.off('video-frame');
      // peerRef.current?.close();
      socket.current.disconnect();
    };
  }, []);

  return canvasRef;
};
