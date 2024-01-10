var audio = document.getElementById("audio");
var textToRead = document.getElementById("text-to-read");

function speakText() {
    var msg = new SpeechSynthesisUtterance();
    msg.text = textToRead.textContent;
    window.speechSynthesis.speak(msg);

    // Atualize o conteúdo do elemento de áudio para acompanhar a leitura por voz
    getAudioBlobUrl(textToRead.textContent)
        .then(audioUrl => {
            audio.src = audioUrl;
            audio.play();
        })
        .catch(error => {
            console.error('Erro ao obter URL do áudio:', error);
        });
}

function pauseAudio() {
    audio.pause();
}

function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
}

function getAudioBlobUrl(text) {
    // Substitua 'SUA_CHAVE_DE_API' pela sua chave de API do Google Cloud
    const apiKey = 'SUA_CHAVE_DE_API';
    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: {
                text: text,
            },
            voice: {
                languageCode: 'pt-BR',
                name: 'pt-BR-Wavenet-D',
            },
            audioConfig: {
                audioEncoding: 'MP3',
            },
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.audioContent) {
            const audioBlob = new Blob([Buffer.from(data.audioContent, 'base64')], { type: 'audio/mp3' });
            return URL.createObjectURL(audioBlob);
        } else {
            throw new Error('Resposta inválida da API de Text-to-Speech');
        }
    });
}
