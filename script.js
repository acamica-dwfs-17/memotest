class Ficha {
  constructor(valor, imagen) {
    this.imagen = imagen;
    this.valor = valor;
  }
}

class Juego {
  constructor(contenedor) {
    this.fichas = [];
    this.contenedor = contenedor;
    this.grilla = new Array(4);
  }

  init() {
    for (let i = 0; i < this.fichas.length / 2; i++) {
      this.grilla[i] = new Array(4);
    }

    for (let i = 0; i < this.fichas.length / 2; i++) {
      for (let j = 0; j < this.fichas.length / 2; j++) {
        this.grilla[i][j] = null;

        let divCarta = $("<div>")
          .addClass("card")
          .attr("data-row", i)
          .attr("data-col", j);

        let rand = 0;
        let cont = 0;

        do {
          //Obtengo posicion de ficha random
          rand = Math.floor(Math.random() * this.fichas.length);
          cont = this.existsCount(this.fichas[rand].valor);
        } while (cont >= 2);

        this.grilla[i][j] = this.fichas[rand].valor;

        this.contenedor.append(divCarta);
      }
    }
    console.log(this.grilla);

    this.contenedor.find(".card").click(e => {
      //Elemento parseo el target a jQuery para utilizar sus metodos
      let elemento = $(e.target);

      //Si no tiene la clase completed debe evaluar
      if (!elemento.hasClass("completed")) {
        //Busca elementos ya dados vuelta
        let busquedaElementos = this.contenedor.find(".card.reversed");

        //Obtiene la posicion en la grilla del elemento en el cual se hizo click
        let elementoRow = elemento.attr("data-row");
        let elementoCol = elemento.attr("data-col");

        //Si hay uno dado vuelta
        if (busquedaElementos.length == 1) {
          //Obtengo la posicion en la grilla de ese elemento ya dado vuelta previamente
          let otroElementoRow = busquedaElementos.attr("data-row");
          let otroElementoCol = busquedaElementos.attr("data-col");

          //Comparo ambos valores de la grilla
          if (
            this.grilla[otroElementoRow][otroElementoCol] ==
            this.grilla[elementoRow][elementoCol]
          ) {
            elemento.addClass("completed");
            busquedaElementos.addClass("completed");
          }
        } else {
          busquedaElementos.removeClass("reversed");
          elemento.html("");
        }

        elemento.addClass("reversed");
        elemento.html(this.grilla[elementoRow][elementoCol]);
      }
    });
  }

  existsCount(valor) {
    /* let cont = 0
        for (let i = 0; i < this.grilla.length; i++) {
            for (let j = 0; j < this.grilla.length; j++) {
                if(this.grilla[i][j] == valor)
                    cont++
            }
        }
        return cont */

    return this.grilla.reduce((acumulador, valorActual) =>  acumulador + valorActual.includes(valor), 0);
  }

  agregarFicha(nuevaFicha) {
    this.fichas.push(nuevaFicha);
  }
}

let miJuego = new Juego($(".grid"));

for (let index = 0; index < 8; index++) {
  miJuego.agregarFicha(new Ficha(index));
}

miJuego.init();
