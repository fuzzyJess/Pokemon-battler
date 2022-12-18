import inquirer from "inquirer";

class Pokemon {
  constructor(name, hitPoints, attackDamage) {
    this.name = name;
    this.type = "normal";
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.move = "tackle";
    this.trainer = "free as a bird";
  }

  isEffectiveAgainst(enemy) {
    return this.strong === enemy.type;
  }

  isWeakTo(enemy) {
    return this.weak === enemy.type;
  }

  takeDamage(amount) {
    this.hitPoints -= amount;
  }

  useMove() {
    return `${this.name} used ${this.move}`;
  }

  hasFainted() {
    return this.hitPoints <= 0;
  }
}

class Rattata extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.strong = "grass";
    this.weak = "water";
    this.type = "fire";
  }
}

class Charmander extends Fire {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.move = "ember";
  }
}

class Water extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.strong = "fire";
    this.weak = "grass";
    this.type = "water";
  }
}

class Squirtle extends Water {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.move = "water gun";
  }
}

class Grass extends Pokemon {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.strong = "water";
    this.weak = "fire";
    this.type = "grass";
  }
}

class Bulbasaur extends Grass {
  constructor(name, hitPoints, attackDamage) {
    super(name, hitPoints, attackDamage);
    this.move = "vine whip";
  }
}

class Pokeball {
  constructor() {
    this.store = [];
  }
  throw(pokemon) {
    if (pokemon === undefined) {
      if (this.store.length === 0) {
        return `Pokeball is empty`;
      } else {
        console.log(`Go ${this.store[0].name}!`);
        return this.store[0];
      }
    }
    if (this.store.length === 0) {
      this.store.push(pokemon);
      console.log(`You caught ${pokemon.name}`);
    } else {
      return `Pokeball is full`;
    }
  }
  isEmpty() {
    return this.store.length === 0;
  }
  contains() {
    if (this.store.length === 0) {
      return "empty ...";
    } else {
      return this.store[0].name;
    }
  }
}

class Trainer {
  constructor(name = "unnamed trainer") {
    this.belt = [
      new Pokeball(),
      new Pokeball(),
      new Pokeball(),
      new Pokeball(),
      new Pokeball(),
      new Pokeball(),
    ];
    this.name = name;
  }

  catch(pokemon) {
    for (let i = 0; i < this.belt.length; i++) {
      if (this.belt[i].isEmpty()) {
        this.belt[i].throw(pokemon);
        pokemon.trainer = this;
        break;
      }
      if (i === this.belt.length - 1) {
        return "All your Pokeballs are full!";
      }
    }
  }

  getPokemon(searchName) {
    for (let i = 0; i < this.belt.length; i++) {
      const pokeball = this.belt[i];
      if (!pokeball.isEmpty() && pokeball.store[0].name === searchName) {
        return pokeball.throw();
      }
    }
  }
}

class Battle {
  constructor(trainer1, trainer2, trainer1pokemon, trainer2pokemon) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
    this.trainer1pokemon = trainer1.getPokemon(trainer1pokemon);
    this.trainer2pokemon = trainer2.getPokemon(trainer2pokemon);
    //this.turn = this.trainer1;
  }
  fight(attackingPokemon) {
    let defendingPokemon = this.trainer1pokemon;
    if (attackingPokemon === this.trainer1pokemon) {
      defendingPokemon = this.trainer2pokemon;
    }

    let attackMessage = "";

    attackMessage += `${attackingPokemon.name} used ${attackingPokemon.move}\n`;

    let damage = attackingPokemon.attackDamage;

    if (attackingPokemon.isEffectiveAgainst(defendingPokemon)) {
      damage = Math.round(damage * 1.25);
      attackMessage += "It's super effective!";
    } else if (attackingPokemon.isWeakTo(defendingPokemon)) {
      damage = Math.round(damage * 0.75);
      attackMessage += "It's not very effective...";
    }

    console.log(attackMessage);
    defendingPokemon.takeDamage(damage);

    if (defendingPokemon.hasFainted()) {
      console.log(
        `${defendingPokemon.name} fainted!\n${attackingPokemon.trainer.name} wins!`
      );

      return `${defendingPokemon.name} fainted!`;
    }
  }
}

const jessica = new Trainer("jessica");
const joe = new Trainer("joe");
const rattata = new Rattata("ratty", 65, 20);
const bulbasaur = new Bulbasaur("bulby", 65, 20);
const charmander = new Charmander("fiery", 65, 20);
const squirtle = new Squirtle("watery", 65, 20);
jessica.catch(rattata);
joe.catch(bulbasaur);
jessica.catch(charmander);
joe.catch(squirtle);

// setup trainers, pokemon, battle
// trainer1 turn
// trainer2 turn

const trainer1ChangePokemonQuestion = {
  type: "list",
  name: "trainer1pokemon",
  message: "Jessica select your pokemon",
  choices: jessica.belt
    .filter(
      (pokeball) => !pokeball.isEmpty() && !pokeball.store[0].hasFainted()
    )
    .map((pokeball) => pokeball.store[0].name),
};

const trainer2ChangePokemonQuestion = {
  type: "list",
  name: "trainer2pokemon",
  message: "Joe select your pokemon",
  choices: joe.belt
    .filter(
      (pokeball) => !pokeball.isEmpty() && !pokeball.store[0].hasFainted()
    )
    .map((pokeball) => pokeball.store[0].name),
};

const trainer1FightQuestion = {
  type: "list",
  name: "choice",
  message: "Jessica make a choice",
  choices: ["fight", "change pokemon"],
};

const trainer2FightQuestion = {
  type: "list",
  name: "choice",
  message: "Joe make a choice",
  choices: ["fight", "change pokemon"],
};

function nextTurn(trainer, battle) {
  if (trainer.name === "jessica") {
    inquirer.prompt(trainer1FightQuestion).then((answers) => {
      if (answers.choice === "fight") {
        battle.fight(battle.trainer1pokemon);
        if (!battle.trainer2pokemon.hasFainted()) {
          console.log(
            `${battle.trainer2pokemon.name} has ${battle.trainer2pokemon.hitPoints} hit points remaining!`
          );
          nextTurn(joe, battle);
        }
      }
    });
  } else {
    inquirer.prompt(trainer2FightQuestion).then((answers) => {
      if (answers.choice === "fight") {
        battle.fight(battle.trainer2pokemon);
        if (!battle.trainer1pokemon.hasFainted()) {
          console.log(
            `${battle.trainer1pokemon.name} has ${battle.trainer1pokemon.hitPoints} hit points remaining!`
          );
          nextTurn(jessica, battle);
        }
      }
    });
  }
}

inquirer
  .prompt([trainer1ChangePokemonQuestion, trainer2ChangePokemonQuestion])
  .then((answers) => {
    const battle = new Battle(
      jessica,
      joe,
      answers.trainer1pokemon,
      answers.trainer2pokemon
    );
    nextTurn(jessica, battle);
    // inquirer.prompt([trainer1FightQuestion]).then((answers) => {
    //   if (answers.choice === "fight") {
    //     battle.fight(battle.trainer1pokemon);
    //   }

    // });
  });

// module.exports = {
//   Pokemon,
//   Fire,
//   Grass,
//   Water,
//   Charmander,
//   Squirtle,
//   Bulbasaur,
//   Rattata,
//   Pokeball,
//   Trainer,
//   Battle,
// };
