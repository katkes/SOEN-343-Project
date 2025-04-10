// client/src/Broadcaster.tsx
import { useEffect, useRef } from 'react';
import { SocketFlyweight } from '../services/socket/socket';

export default function Broadcaster() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peers = useRef<{ [id: string]: RTCPeerConnection }>({});
  const socket = useRef(SocketFlyweight.getSocket("/streaming"));
  useEffect(() => {
    socket.current.emit("broadcaster");

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;

      socket.current.on("watcher", (id: string) => {
        const peer = new RTCPeerConnection();
        peers.current[id] = peer;

        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        peer.onicecandidate = ({ candidate }) => {
          if (candidate) socket.current.emit("ice-candidate", id, candidate);
        };

        peer.createOffer()
          .then(offer => peer.setLocalDescription(offer))
          .then(() => {
            socket.current.emit("offer", id, peer.localDescription);
          });
      });

      socket.current.on("answer", (id: string, description) => {
        peers.current[id].setRemoteDescription(description);
      });

      socket.current.on("ice-candidate", (id: string, candidate) => {
        peers.current[id].addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.current.on("disconnectPeer", (id: string) => {
        if (peers.current[id]) {
          peers.current[id].close();
          delete peers.current[id];
        }
      });
    });
  }, []);

  return <video ref={videoRef} autoPlay muted style={{ width: "100%" }} />;
}
