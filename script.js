/*document.getElementById('startButton').addEventListener('click', function() {
    let finalHouse = Math.floor(Math.random() * 9) + 1;
    makeErraticMoves(finalHouse);
});

function makeErraticMoves(finalHouse) {
    let moves = generateRandomMoves(finalHouse);
    moves.push(finalHouse); // Aseguramos que el último movimiento sea hacia la casa final

    moves.forEach((house, index) => {
        setTimeout(() => {
            moveRabbitToHouse(house);
        }, 1000 * index); // Asumimos un segundo por movimiento
    });
}

function generateRandomMoves(finalHouse) {
    let moves = [];
    let numberOfFakeMoves = 3; // Puedes ajustar el número de movimientos falsos

    for (let i = 0; i < numberOfFakeMoves; i++) {
        let fakeMove;
        do {
            fakeMove = Math.floor(Math.random() * 9) + 1;
        } while (fakeMove === finalHouse || moves.includes(fakeMove)); // Evitamos repetir el destino final o movimientos previos

        moves.push(fakeMove);
    }

    return moves;
}

function moveRabbitToHouse(houseNumber) {
    let rabbit = document.getElementById('rabbit');
    let targetHouse = document.getElementById('house' + houseNumber);
    let houseRect = targetHouse.getBoundingClientRect();
    let boardRect = document.getElementById('gameBoard').getBoundingClientRect();

    let relativeTop = houseRect.top - boardRect.top;
    let relativeLeft = houseRect.left - boardRect.left;

    rabbit.style.top = relativeTop + 'px';
    rabbit.style.left = relativeLeft + 'px';
}*//* 
document.getElementById('startButton').addEventListener('click', function() {
    let finalHouse = Math.floor(Math.random() * 9) + 1;
    makeErraticMoves(finalHouse);
});

function makeErraticMoves(finalHouse) {
    let moves = generateRandomMoves(finalHouse);
    moves.push(finalHouse); // Aseguramos que el último movimiento sea hacia la casa final

    moves.forEach((house, index) => {
        setTimeout(() => {
            moveRabbitToHouse(house);
        }, 1000 * index); // Un segundo por movimiento
    });
}

function generateRandomMoves(finalHouse) {
    let moves = [];
    let numberOfFakeMoves = 3; // Número de movimientos falsos

    for (let i = 0; i < numberOfFakeMoves; i++) {
        let fakeMove;
        do {
            fakeMove = Math.floor(Math.random() * 9) + 1;
        } while (fakeMove === finalHouse || moves.includes(fakeMove)); // Evitar repetir el destino final o movimientos previos

        moves.push(fakeMove);
    }

    return moves;
}

function moveRabbitToHouse(houseNumber) {
    let rabbit = document.getElementById('rabbit');
    let targetHouse = document.getElementById('house' + houseNumber);

    // Asumiendo que las dimensiones del tablero son conocidas (300x300px en este caso)
    let boardSize = 300; // Tamaño del tablero
    let houseSize = 30;  // Tamaño de la casa
    let rabbitSize = 20; // Tamaño del conejo

    // Convertimos el porcentaje de posición de la casa a píxeles
    let housePosPercent = getHousePositionPercent(houseNumber);
    let housePosX = boardSize * housePosPercent.left / 100;
    let housePosY = boardSize * housePosPercent.top / 100;

    // Calculamos la posición del conejo para centrarlo en la casa
    let rabbitPosX = housePosX - (rabbitSize / 2) + (houseSize / 2);
    let rabbitPosY = housePosY - (rabbitSize / 2) + (houseSize / 2);

    rabbit.style.left = rabbitPosX + 'px';
    rabbit.style.top = rabbitPosY + 'px';
}

function getHousePositionPercent(houseNumber) {
    // Mapeo de posiciones de las casas en porcentajes
    const housePositions = {
        1: { top: 40, left: 90 },
        2: { top: 20, left: 80 },
        3: { top: 10, left: 50 },
        4: { top: 20, left: 20 },
        5: { top: 50, left: 10 },
        6: { top: 80, left: 20 },
        7: { top: 90, left: 50 },
        8: { top: 80, left: 80 },
        9: { top: 60, left: 90 }
    };

    return housePositions[houseNumber];
} */

let coinCount = 3; // Inicializando el número de monedas

var stripe = Stripe('pk_test_51ORgOgEV9xF2ubpHSBZkTVOi0hlNQXhHFDAySaXF9k9fasAdHtSyzV1HzfpTRuPePBABBGSAkykrdWi21S2wMYxv00zXUSyRsX');



document.getElementById('withdrawButton').addEventListener('click', function() {
    const menu = document.getElementById('withdrawMenu');
    menu.hidden = !menu.hidden;

    const euroValue = coinCount * 0.20; // Cada moneda vale 20 centavos
    document.getElementById('coinInfo').textContent = `Monedas: ${coinCount}`;
    document.getElementById('euroValue').textContent = `Valor en euros: €${euroValue.toFixed(2)}`;
});

document.getElementById('confirmWithdrawal').addEventListener('click', function() {
    alert('Retirada confirmada');
    // Aquí deberías agregar la lógica para manejar la retirada de dinero
    // Por ejemplo, resetear el contador de monedas, etc.
});





document.getElementById('reloadCoins').addEventListener('click', () => {
    fetch('/create-checkout-session', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});






document.getElementById('startButton').addEventListener('click', function() {
    if (coinCount <= 0) {
        showPaymentGateway(); // Mostrar la pasarela de pago
        return;
    }

    let selectedHouse = parseInt(document.getElementById('houseSelection').value);
    let finalHouse = Math.floor(Math.random() * 9) + 1;
    makeErraticMoves(finalHouse);
    coinCount--; // Reducimos una moneda por cada tirada
    updateCoinCount();

    if (selectedHouse === finalHouse) {
        coinCount += 2; // Duplicar la apuesta si acierta
        updateCoinCount();
        alert("¡Acertaste! Has ganado monedas.");
    }

    if (coinCount <= 0) {
        showPaymentGateway(); // Mostrar la pasarela de pago al terminar las monedas
    }
});

function showPaymentGateway() {
    alert("No tienes monedas. ¿Deseas comprar más monedas?");
    // Aquí se implementaría la lógica de la pasarela de pago real.
}

function updateCoinCount() {
    document.getElementById('coinCount').innerText = 'Monedas: ' + coinCount;
}


function makeErraticMoves(finalHouse) {
    let moves = generateRandomMoves(finalHouse);
    moves.push(finalHouse); // Aseguramos que el último movimiento sea hacia la casa final

    moves.forEach((house, index) => {
        setTimeout(() => {
            moveRabbitErratically(house);
        }, 1500 * index); // Tiempo aumentado para permitir movimientos erráticos
    });
}

function generateRandomMoves(finalHouse) {
    let moves = [];
    let numberOfFakeMoves = 3; // Número de movimientos falsos

    for (let i = 0; i < numberOfFakeMoves; i++) {
        let fakeMove;
        do {
            fakeMove = Math.floor(Math.random() * 9) + 1;
        } while (fakeMove === finalHouse || moves.includes(fakeMove)); // Evitar repetir el destino final o movimientos previos

        moves.push(fakeMove);
    }

    return moves;
}function moveRabbitErratically(houseNumber) {
    let rabbit = document.getElementById('rabbit');
    let targetHouse = document.getElementById('house' + houseNumber);
    let currentRect = rabbit.getBoundingClientRect();
    let targetRect = targetHouse.getBoundingClientRect();
    let boardRect = document.getElementById('gameBoard').getBoundingClientRect();

    let currentX = currentRect.left - boardRect.left + (currentRect.width / 2);
    let currentY = currentRect.top - boardRect.top + (currentRect.height / 2);
    let targetX = targetRect.left - boardRect.left + (targetRect.width / 2);
    let targetY = targetRect.top - boardRect.top + (targetRect.height / 2);

    let trailInterval = setInterval(() => {
        createRabbitTrail(); // Función para crear la estela
    }, 100); // Ajusta el intervalo según sea necesario

    // Generar puntos intermedios erráticos
    for (let i = 1; i <= 5; i++) { // Generar 5 puntos intermedios
        let intermediateX = currentX + (targetX - currentX) * i / 5 + (Math.random() - 0.5) * 30;
        let intermediateY = currentY + (targetY - currentY) * i / 5 + (Math.random() - 0.5) * 30;

        setTimeout(() => {
            
            moveRabbitToPosition(intermediateX, intermediateY);
        }, 300 * i); // Movimientos rápidos hacia cada punto intermedio
    }

    // Mover al conejo a la casa después de los movimientos erráticos
    setTimeout(() => {
        moveRabbitToHouse(houseNumber);
       
    }, 300 * 6);
}

function moveRabbitToPosition(x, y) {
    let rabbit = document.getElementById('rabbit');
    let rabbitHalfWidth = rabbit.offsetWidth / 2;
    let rabbitHalfHeight = rabbit.offsetHeight / 2;

    rabbit.style.left = (x - rabbitHalfWidth) + 'px';
    rabbit.style.top = (y - rabbitHalfHeight) + 'px';
}

function moveRabbitToHouse(houseNumber) {
    let rabbit = document.getElementById('rabbit');
     let targetHouse = document.getElementById('house' + houseNumber);

    // Asumiendo que las dimensiones del tablero son conocidas (300x300px en este caso)
    let boardSize = 300; // Tamaño del tablero
    let houseSize = 30;  // Tamaño de la casa
    let rabbitSize = 20; // Tamaño del conejo

    // Convertimos el porcentaje de posición de la casa a píxeles
    let housePosPercent = getHousePositionPercent(houseNumber);
    let housePosX = boardSize * housePosPercent.left / 100;
    let housePosY = boardSize * housePosPercent.top / 100;

    // Calculamos la posición del conejo para centrarlo en la casa
    let rabbitPosX = housePosX - (rabbitSize / 2) + (houseSize / 2);
    let rabbitPosY = housePosY - (rabbitSize / 2) + (houseSize / 2);

    rabbit.style.left = rabbitPosX + 'px';
    rabbit.style.top = rabbitPosY + 'px'; 


    



}

function getHousePositionPercent(houseNumber) {
    // Mapeo de posiciones de las casas en porcentajes
    const housePositions = {
        1: { top: 40, left: 90 },
        2: { top: 20, left: 80 },
        3: { top: 10, left: 50 },
        4: { top: 20, left: 20 },
         5: { top: 50, left: 10 },
        6: { top: 80, left: 20 },
        7: { top: 90, left: 50 },
        8: { top: 80, left: 80 },
        9: { top: 60, left: 90 }
    };

    return housePositions[houseNumber];
}

function resetRabbitPosition() {
    // Vuelve el conejo a su posición inicial
    let rabbit = document.getElementById('rabbit');
    rabbit.style.left = '50%';
    rabbit.style.top = '50%';
    setTimeout(() => {}, 1000);
}

function createRabbitTrail() {
    let trail = document.createElement('div');
    trail.className = 'rabbit-trail';
    let rabbit = document.getElementById('rabbit');
    let rabbitRect = rabbit.getBoundingClientRect();

    // Posiciona la estela donde está el conejo
    trail.style.left = `${rabbitRect.left + window.scrollX}px`;
    trail.style.top = `${rabbitRect.top + window.scrollY}px`;

    document.body.appendChild(trail);

    // Haz que la estela se desvanezca y luego elimínala
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 500);
}

updateCoinCount();
resetRabbitPosition(); // Vuelve el conejo a su posición inicial