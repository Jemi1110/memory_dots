let activar_game = false;
//POSIBLES POSICIONES DE LOS CIRCULOS
let ar_pos = ['0', 'calc(100%/3)', 'calc(100%*2/3)'];
//let activar_game = false;
let palabras_secretas = ["SOLAR", "MAGIA", "MENTA", "RUIDO"]; // puedes tener varias
let palabra_meta = palabras_secretas[Math.floor(Math.random() * palabras_secretas.length)];
let ronda_actual = 0;
let rondas_totales = palabra_meta.length;

function animate() {
    process_begin();
}
function process_begin() {
    document.getElementById("idbtn").style.display = "none";
    activar_game = false;

    let ar_circles = document.getElementsByClassName("draw-circle");
    for (let i = 0; i < ar_circles.length; i++) {
        ar_circles[i].style.background = "#00ffb3";
    }

    let obj = document.getElementById("objetive");
    obj.style.top = "10px"; // mostramos objetivo

    setTimeout(() => {
        obj.style.top = "50px"; // lo escondemos

        let movimientos = 3; // número de movimientos antes del final
        let delay = 400; // tiempo entre movimientos en ms
        let ar_dom = document.getElementsByClassName("circle");

        let move_circles = (paso) => {
            let ar_val = [];

            for (let i = 0; i < ar_dom.length; i++) {
                let pos_mov = i;
                let validar = true;

                while (validar) {
                    if (i != ar_dom.length - 1) {
                        pos_mov = Math.round(Math.random() * (ar_pos.length - 1));
                        let contador = 0;
                        for (let j = 0; j < ar_val.length; j++) {
                            if (ar_val[j] == pos_mov) contador++;
                        }
                        if (contador == 0 && pos_mov != i) {
                            validar = false;
                            ar_val.push(pos_mov);
                        }
                    } else {
                        let j = 0;
                        let validar2 = true;
                        while (validar2) {
                            let contador = 0;
                            for (let k = 0; k < ar_val.length; k++) {
                                if (ar_val[k] == j) contador++;
                            }
                            if (contador == 0) {
                                pos_mov = j;
                                ar_val.push(j);
                                validar2 = false;
                            }
                            j++;
                        }
                        validar = false;
                    }
                }

                ar_dom[i].style.left = ar_pos[pos_mov];
            }

            // Actualizamos posiciones para el siguiente paso
            let ar_aux = [];
            for (let i = 0; i < ar_val.length; i++) {
                ar_aux.push(ar_pos[ar_val[i]]);
            }
            ar_pos = ar_aux;

            if (paso < movimientos - 1) {
                setTimeout(() => move_circles(paso + 1), delay);
            } else {
                activar_game = true; // Activamos juego después del último movimiento
            }
        };

        move_circles(0);
    }, 1000); // esperar a que el objetivo se oculte
}


//PARA RECONOCER LOS CLICKS EN LOS CIRCULOS VERDES
function validar_punto() {
    if (activar_game) {
        let obj = this.getElementsByClassName("obj");
        activar_game = false;

        if (obj.length == 1) {
            // ✅ ACIERTO
            let letra = palabra_meta[ronda_actual];
            alert("¡Correcto!\nLetra revelada: " + letra);
            obj[0].style.top = "-30px";

            ronda_actual++; // Avanzamos de ronda

            if (ronda_actual < rondas_totales) {
                document.getElementById("idbtn").style.display = "block";
            } else {
                pedir_palabra_final();
            }

        } else {
            // ❌ FALLO
            this.getElementsByClassName("draw-circle")[0].style.background = "#ce1510";
            alert("Fallaste. Intenta nuevamente.");

            // Mostrar dónde estaba la pelotita
            let todos = document.getElementsByClassName("obj");
            if (todos.length === 1) {
                todos[0].style.top = "-30px";
            }

            // Espera un momento y vuelve a mostrar el botón para volver a intentar misma letra
            setTimeout(() => {
                document.getElementById("idbtn").style.display = "block";
            }, 500);
        }
    }
}



function pedir_palabra_final() {
    let intento = prompt(
        "Has completado todas las rondas.\n" +
        "¿Puedes escribir la palabra completa?"
    );

    if (intento && intento.toUpperCase() === palabra_meta) {
        alert("🎉 ¡Correcto! Has ganado el juego.");
    } else {
        alert("❌ Incorrecto.\nLa palabra era: " + palabra_meta + "\nTu intento fue: " + (intento || ""));
    }

    // Reiniciar juego
    document.getElementById("idbtn").style.display = "block";
    ronda_actual = 0;
    palabra_meta = palabras_secretas[Math.floor(Math.random() * palabras_secretas.length)];
}





let ar = document.getElementsByClassName("circle");
for (var i = 0; i < ar.length; i++) {
    ar[i].addEventListener('click', validar_punto, false);
}