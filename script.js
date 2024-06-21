document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpg', 'images/img5.jpg',
        'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg'
    ];

    let currentRound = 0;
    const rounds = [4, 5, 6, 7, 8, 9, 10];
    let sequence = [];
    let userOrder = [];

    const imageContainer = document.getElementById('image-container');
    const orderContainer = document.getElementById('order-container');
    const checkOrderButton = document.getElementById('check-order');

    function startRound() {
        userOrder = [];
        imageContainer.innerHTML = '';
        orderContainer.innerHTML = '';
        checkOrderButton.style.display = 'none';

        const roundImages = getRandomImages(rounds[currentRound]);
        sequence = roundImages.slice();

        showImagesSequentially(sequence, () => {
            orderContainer.innerHTML = '';
            const shuffledSequence = shuffleArray([...sequence]); // Shuffle the sequence before displaying
            shuffledSequence.forEach(img => {
                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.addEventListener('click', () => selectImage(img, imgElement));
                orderContainer.appendChild(imgElement);
            });
            checkOrderButton.style.display = 'block';
        });
    }

    function getRandomImages(num) {
        return images.sort(() => 0.5 - Math.random()).slice(0, num);
    }

    function showImagesSequentially(images, callback) {
        let index = 0;

        function showNextImage() {
            if (index < images.length) {
                imageContainer.innerHTML = '';
                const imgElement = document.createElement('img');
                imgElement.src = images[index];
                imageContainer.appendChild(imgElement);
                index++;
                setTimeout(showNextImage, 3000);
            } else {
                imageContainer.innerHTML = '';
                callback();
            }
        }

        showNextImage();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function selectImage(img, imgElement) {
        if (userOrder.length < sequence.length) {
            userOrder.push(img);
            imgElement.classList.add('selected');
            const selectedImgElement = document.createElement('img');
            selectedImgElement.src = img;
            imageContainer.appendChild(selectedImgElement);
        }
    }

    checkOrderButton.addEventListener('click', checkOrder);

    function checkOrder() {
        if (userOrder.length !== sequence.length) {
            alert('Debes seleccionar todas las imágenes.');
            return;
        }

        let correct = true;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] !== userOrder[i]) {
                correct = false;
                break;
            }
        }

        if (correct) {
            alert('¡Correcto! Pasas a la siguiente ronda.');
            currentRound++;
            if (currentRound < rounds.length) {
                startRound();
            } else {
                alert('¡Felicidades! Has completado el juego.');
            }
        } else {
            alert('Incorrecto. Inténtalo de nuevo.');
            startRound();
        }
    }
    function getName() {
        let userName = prompt("Por favor, ingresa tu nombre:");
        alert("Hola, " + userName + "! Bienvenido.");
        startRound();

    }
    
    getName();

});
