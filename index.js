/* jslint:nodejs */
"use strict";
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
);


function Program() {
  var self = this;

  this.points = 0;
  this.hits = 0;
  this.player = "Jack";

  this.evaluate = function(val) {
    if(val == 1)
      val = 2;

    let output =  Math.abs(Math.floor(Math.random() * val));

    if(output > 3){
      output = self.evaluate(val);
    }

    if(val > 7 && output == 0){
      output = self.evaluate(val);
    }

    return output;
  };

  this.init = function(){
    self.points = 0;
    self.hits = 0;
    self.player = "Jack";

    console.log("Bem vindo ao Coragem e Destino");
    rl.question("Me diga, ...heroi... quem é você?  ->", (nome) => {
    self.player = nome;
    console.log("...");
    console.log("   ");
    console.log("O seu teste começa agora.");
      self.flow();
  });

  };

  this.flow = function(){

    rl.question("Qual é o numero da morte? (de 1 a 10) ->", (resposta) => {

      if(resposta === "Ja chega"){



          fs.writeFile(self.player, "coragem: " + self.points + " /n destino: " + self.points, function(){
            console.log("...");
            console.log("...");
            console.log("   ");
            console.log("   ");
            console.log("   ");

            console.log(self.player + ", O jogo acabou pra você... Espero que ainda esteja respirando.");
            console.log("Pontos de Coragem:" + self.points);
            console.log("Fatores do Destino:" + self.hits);
            rl.close();
              return;
          });

      }

      else if(isNaN(resposta)){
        console.log("O que é isso... apenas numeros de 1 a 10, garoto.");
        self.flow();
        return;
      }

      else if(resposta > 10) {
        console.log("Eu não vou deixar você fazer isso consigo mesmo...");
        self.flow();

      }

      //Flow...
      else {

        let hit = self.evaluate(resposta);
        self.hits += hit;
        self.points += parseInt(resposta);

        console.log("Número do destino: " + hit);

        self.flow();

      }



    });
  };
};

var prog = new Program();

prog.init();
