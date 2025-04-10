import { useEffect, useRef } from 'react';
import { SocketFlyweight } from '../services/socket/socket';
export const useStreamViewer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const socket = useRef(SocketFlyweight.getSocket('/videostream'));
  useEffect(() => {
    // Listen for the broadcaster's announcement
    // socket.current.connect();
    socket.current.on('broadcaster', (broadcasterId: string) => {
      // Let the broadcaster know this viewer wants to connect
      socket.current.emit('watcher', broadcasterId);
      console.log('hello???');

      // Create peer connection
      peerRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }, // Optional STUN server
        ],
      });

      // Handle incoming media
      peerRef.current.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates from this side (viewer)
      peerRef.current.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.current.emit('ice-candidate', broadcasterId, candidate);
        }
      };

      // Receive offer and respond with answer
      const pendingCandidates: RTCIceCandidateInit[] = [];

      socket.current.on('ice-candidate', async (senderId, candidate) => {
        const rtcCandidate = new RTCIceCandidate(candidate);
        console.log(senderId, candidate);
        if (peerRef.current?.remoteDescription) {
          await peerRef.current.addIceCandidate(rtcCandidate);
        } else {
          pendingCandidates.push(rtcCandidate);
        }
      });

      socket.current.on('offer', async (senderId, description) => {
        if (!peerRef.current) return;

        await peerRef.current.setRemoteDescription(description);

        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        socket.current.emit('answer', senderId, peerRef.current.localDescription);

        // ✅ Process queued ICE candidates
        for (const candidate of pendingCandidates) {
          await peerRef.current.addIceCandidate(candidate);
        }

        pendingCandidates.length = 0; // Clear queue
      });
    });

    // Cleanup on unmount
    return () => {
      socket.current.off('broadcaster');
      socket.current.off('offer');
      socket.current.off('ice-candidate');
      peerRef.current?.close();
      // socket.current.disconnect();
    };
  }, []);

  return videoRef;
};
