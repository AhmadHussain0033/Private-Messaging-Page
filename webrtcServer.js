const peerConnections = {};
const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302" // Google's public STUN server
        }
    ]
};

const socket = io();

// Create a new peer connection
function createPeerConnection(remoteSocketId) {
    const peerConnection = new RTCPeerConnection(config);

    // When an ICE candidate is found, send it to the other peer
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('webrtc_ice_candidate', {
                to: remoteSocketId,
                candidate: event.candidate
            });
        }
    };

    // When a track (media stream) is added, receive the remote stream
    peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams;
        document.getElementById('remote-video').srcObject = remoteStream;
    };

    return peerConnection;
}

// Handle when a new peer joins
socket.on('webrtc_offer', async ({ from, offer }) => {
    const peerConnection = createPeerConnection(from);
    peerConnections[from] = peerConnection;

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('webrtc_answer', { to: from, answer });
});

// Handle receiving a WebRTC answer
socket.on('webrtc_answer', async ({ from, answer }) => {
    const peerConnection = peerConnections[from];
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

// Handle ICE candidates
socket.on('webrtc_ice_candidate', async ({ from, candidate }) => {
    const peerConnection = peerConnections[from];
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

// Start WebRTC offer
async function startWebRTC(remoteSocketId) {
    const peerConnection = createPeerConnection(remoteSocketId);
    peerConnections[remoteSocketId] = peerConnection;

    // Add local stream (media) if any
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    document.getElementById('local-video').srcObject = localStream;

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit('webrtc_offer', {
        to: remoteSocketId,
        offer: peerConnection.localDescription
    });
}
