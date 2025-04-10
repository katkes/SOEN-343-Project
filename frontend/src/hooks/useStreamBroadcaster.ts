import { useEffect, useRef } from 'react';
import { SocketFlyweight } from '../services/socket/socket';

export const useStreamBroadCaster = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<{ [id: string]: RTCPeerConnection }>({});
  const streamRef = useRef<MediaStream | null>(null);
  const socket = useRef(SocketFlyweight.getSocket('/videostream'));
  useEffect(() => {
    // Get local camera + mic
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Notify the server this client is a broadcaster
      socket.current.emit('broadcaster');
      // console.log('broadcaster');
      // When a new viewer (watcher) connects
      socket.current.on('watcher', (viewerId: string) => {
        const peer = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }, // Optional: STUN server
          ],
        });

        // Save peer connection
        peersRef.current[viewerId] = peer;

        // Add media tracks to connection
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        // Handle ICE candidates
        peer.onicecandidate = ({ candidate }) => {
          if (candidate) {
            socket.current.emit('ice-candidate', viewerId, candidate);
          }
        };

        // Create and send offer to viewer
        peer
          .createOffer()
          .then((offer) => peer.setLocalDescription(offer))
          .then(() => {
            socket.current.emit('offer', viewerId, peer.localDescription);
          });
      });

      const candidateQueue: RTCIceCandidateInit[] = [];
      let remoteDescriptionSet = false;

      socket.current.on('answer', (viewerId, description) => {
        const peer = peersRef.current[viewerId];
        if (peer) {
          peer.setRemoteDescription(description).then(() => {
            remoteDescriptionSet = true;

            // Add any queued ICE candidates
            candidateQueue.forEach((c) => peer.addIceCandidate(new RTCIceCandidate(c)));
            candidateQueue.length = 0;
          });
        }
      });

      socket.current.on('ice-candidate', (viewerId, candidate) => {
        const peer = peersRef.current[viewerId];
        if (peer) {
          if (remoteDescriptionSet) {
            peer.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
            candidateQueue.push(candidate);
          }
        }
      });

      // Viewer disconnected
      socket.current.on('disconnectPeer', (viewerId: string) => {
        const peer = peersRef.current[viewerId];
        if (peer) {
          peer.close();
          delete peersRef.current[viewerId];
        }
      });
    });

    // Cleanup on unmount
    return () => {
      socket.current.off('watcher');
      socket.current.off('answer');
      socket.current.off('ice-candidate');
      socket.current.off('disconnectPeer');

      // Close all peer connections
      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
    };
  }, []);
  return videoRef;
};
