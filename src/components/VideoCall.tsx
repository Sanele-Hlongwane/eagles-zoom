'use client';
// components/VideoCall.js
import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const VideoCall = ({ currentUser, targetUser }) => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const initMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        localVideoRef.current.srcObject = stream;

        // Create or fetch session from Prisma
        const session = await prisma.session.findFirst({
          where: {
            OR: [
              { initiatorId: currentUser.id, receiverId: targetUser.id },
              { initiatorId: targetUser.id, receiverId: currentUser.id },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!session && currentUser.id !== targetUser.id) {
          const peer = new SimplePeer({ initiator: true, stream });
          setPeer(peer);

          peer.on('signal', signal => {
            prisma.session.create({
              data: {
                initiatorId: currentUser.id,
                receiverId: targetUser.id,
                signal: JSON.stringify(signal),
              },
            });
          });

          peer.on('stream', remoteStream => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        } else if (session) {
          const peer = new SimplePeer({ initiator: false, stream });
          setPeer(peer);

          peer.signal(JSON.parse(session.signal));

          peer.on('stream', remoteStream => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, [currentUser, targetUser]);

  const handleEndCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setStream(null);
  };

  return (
    <div className="flex justify-center space-x-4">
      <div className="w-1/2">
        <video ref={localVideoRef} autoPlay muted className="w-full h-auto" />
      </div>
      <div className="w-1/2">
        <video ref={remoteVideoRef} autoPlay className="w-full h-auto" />
      </div>
      <div>
        <button onClick={handleEndCall} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
          End Call
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
