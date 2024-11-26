function generateBracket(numParticipants) {
    let rounds = [];
    let eliminations = 0;
    let totalRounds = Math.ceil(Math.log2(numParticipants));
    let totalMatches = numParticipants - 1;  // Karena untuk setiap eliminasi ada satu match

    // Menentukan jumlah bye pada setiap round
    let upperBye = Math.ceil(numParticipants / 2) - numParticipants / 2;
    let lowerBye = numParticipants / 2;

    // Membuat array peserta
    let participants = [];
    for (let i = 1; i <= numParticipants; i++) {
        participants.push(`Partisipan ${i}`);
    }

    // Menangani Upper dan Lower Byes
    let upperBracket = participants.slice(0, upperBye);
    let lowerBracket = participants.slice(upperBye);

    // Membuat rounds
    for (let i = 0; i < totalRounds; i++) {
        let roundMatches = [];
        let roundEliminations = Math.ceil(participants.length / 2);

        // Lakukan eliminasi untuk setiap match pada round
        for (let j = 0; j < roundEliminations; j++) {
            roundMatches.push({
                matchId: j + 1,
                participant1: participants[j],
                participant2: participants[participants.length - 1 - j],
            });
        }

        rounds.push(roundMatches);
        participants = participants.slice(0, participants.length / 2);  // update peserta untuk round berikutnya
    }

    return {
        rounds,
        eliminations: totalMatches,
        totalRounds
    };
}

// Event listener untuk tombol generate bracket
document.getElementById('generate-bracket').addEventListener('click', () => {
    let numParticipants = document.getElementById('num-participants').value;
    let bracket = generateBracket(numParticipants);
    console.log(bracket); // Menampilkan bracket di console atau tampilkan di UI
});