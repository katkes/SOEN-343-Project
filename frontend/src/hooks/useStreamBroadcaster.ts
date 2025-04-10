import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { SocketFlyweight } from '../services/socket/socket';

interface UseBroadcasterOptions {
  nameSpace?: string;
  frameRate?: number; // in ms
}

export function useStreamBroadcaster(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  options?: UseBroadcasterOptions
) {
  const { nameSpace = '/videostream', frameRate = 100 } = options || {};

  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const socketRef = useRef<Socket | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const startStreaming = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Display video
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Initialize socket
        const socket = SocketFlyweight.getSocket(nameSpace);
        socketRef.current = socket;

        // 🎥 Video frames
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const sendVideoFrame = () => {
          const video = videoRef.current;
          if (!video || !ctx) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL('image/webp', 0.6);
          socket.emit('video-frame', frame);
          console.log('sent video frame')
        };

        intervalRef.current = setInterval(sendVideoFrame, frameRate);

        // 🔊 Audio
        const audioRecorder = new MediaRecorder(stream);
        audioRecorder.ondataavailable = (event: BlobEvent) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            socket.emit('audio-chunk', reader.result);
          };
          reader.readAsArrayBuffer(event.data);
        };

        audioRecorder.start(250);

        // Cleanup
        return () => {
          audioRecorder.stop();
          if (intervalRef.current) clearInterval(intervalRef.current);
          stream.getTracks().forEach((track) => track.stop());
          socket.disconnect();
        };
      } catch (err) {
        console.error('Error starting broadcast:', err);
      }
    };

    const cleanupPromise = startStreaming();

    return () => {
      cleanupPromise?.then((cleanup) => {
        if (typeof cleanup === 'function') cleanup();
      });
    };
  }, [nameSpace, frameRate, videoRef]);
}
