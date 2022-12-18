const {
  Pokemon,
  Fire,
  Grass,
  Water,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Pokeball,
  Trainer,
  Battle,
} = require("./pokemon_battler");

describe("Pokemon", () => {
  describe("Initialisation set up", () => {
    test("Pokemon has a name property", () => {
      const testPokemon = new Pokemon("pikachu");
      expect(testPokemon.name).toBe("pikachu");
    });
    test("Pokemon has a type property", () => {
      const testPokemon = new Pokemon("pikachu");
      expect(testPokemon.type).toBe("normal");
    });
    test("Pokemon has a hitPoints property", () => {
      const testPokemon = new Pokemon("pikachu", 35);
      expect(testPokemon.hitPoints).toBe(35);
    });
    test("Pokemon has an attackDamage property", () => {
      const testPokemon = new Pokemon("pikachu", 35, 55);
      expect(testPokemon.attackDamage).toBe(55);
    });
    test("Pokemon has a move property", () => {
      const testPokemon = new Pokemon("pikachu", 35, 55);
      expect(testPokemon.move).toBe("tackle");
    });
  });

  describe("Methods", () => {
    test("isEffectiveAgainst returns the appropriate boolean", () => {
      const flareon = new Fire("flareon", 65, 20);
      const leafeon = new Grass("leafeon", 65, 17);
      const vaporeon = new Water("vaporeon", 70, 19);

      expect(flareon.isEffectiveAgainst(leafeon)).toBe(true);
      expect(flareon.isEffectiveAgainst(vaporeon)).toBe(false);
    });

    test("isWeakTo returns the appropriate boolean", () => {
      const flareon = new Fire("flareon", 65, 20);
      const leafeon = new Grass("leafeon", 65, 17);
      const vaporeon = new Water("vaporeon", 70, 19);

      expect(flareon.isWeakTo(vaporeon)).toBe(true);
      expect(leafeon.isWeakTo(vaporeon)).toBe(false);
    });

    test("takeDamage reduces hitPoints by the number passed in", () => {
      const flareon = new Pokemon("flareon", 65, 20);

      flareon.takeDamage(10);

      expect(flareon.hitPoints).toBe(55);
    });

    test("useMove returns the Pokemon's attack damage", () => {
      const flareon = new Pokemon("flareon", 65, 20);

      expect(flareon.useMove()).toBe("flareon used tackle");
    });

    test("hasFainted returns a boolean of true when hitPoints <= 0, and false otherwise", () => {
      const flareon = new Pokemon("flareon", 65, 20);

      expect(flareon.hasFainted()).toBe(false);

      flareon.takeDamage(65);

      expect(flareon.hasFainted()).toBe(true);
    });
  });
  describe("Pokemon inheritance", () => {
    test("check that child class of Fire is a instanceof Pokemon", () => {
      const flareon = new Fire("flareon", 65, 20);
      expect(flareon instanceof Pokemon).toBe(true);
    });
  });

  describe("Species Inheritance", () => {
    test("check that child class of Charmander is an instanceof Fire", () => {
      const charmander = new Charmander("firey", 65, 20);
      expect(charmander instanceof Fire).toBe(true);
    });

    test("Charmander has a move called ember", () => {
      const charmander = new Charmander("firey", 65, 20);
      expect(charmander.move).toBe("ember");
    });

    test("check that child class of Squirtle is an instanceof Water", () => {
      const squirtle = new Squirtle("watery", 65, 20);
      expect(squirtle instanceof Water).toBe(true);
    });

    test("Squirtle has a move called water gun", () => {
      const squirtle = new Squirtle("watery", 65, 20);
      expect(squirtle.move).toBe("water gun");
    });

    test("check that child class of Bulbasaur is an instanceof Grass", () => {
      const bulbasaur = new Bulbasaur("bulby", 65, 20);
      expect(bulbasaur instanceof Grass).toBe(true);
    });

    test("Bulbasaur has a move called vine whip", () => {
      const bulbasaur = new Bulbasaur("bulby", 65, 20);
      expect(bulbasaur.move).toBe("vine whip");
    });

    test("check that child class of Rattata is an instanceof Pokemon", () => {
      const rattata = new Rattata("ratty", 65, 20);
      expect(rattata instanceof Pokemon).toBe(true);
    });

    test("Rattata has a move called tackle", () => {
      const rattata = new Rattata("ratty", 65, 20);
      expect(rattata.move).toBe("tackle");
    });
  });
  describe("Pokeballs", () => {
    test("a pokeball can store a pokemon", () => {
      const testBall = new Pokeball();
      expect(testBall.hasOwnProperty("store")).toBe(true);
    });
    test("a pokeball has a throw method", () => {
      const testBall = new Pokeball();
      const rattata = new Rattata("ratty", 65, 20);
      testBall.throw(rattata);
      expect(testBall.store).toEqual([rattata]);
    });
    test("a pokeball already holding a pokemon will not then catch a new pokemon", () => {
      const testBall = new Pokeball();
      const rattata = new Rattata("ratty", 65, 20);
      const bulbasaur = new Bulbasaur("bulby", 65, 20);
      testBall.throw(rattata);
      expect(testBall.throw(bulbasaur)).toBe("Pokeball is full");
      expect(testBall.store).toEqual([rattata]);
    });
    test("if using throw when the Pokeball is empty should recieve the right error message", () => {
      const testBall = new Pokeball();
      expect(testBall.throw()).toBe("Pokeball is empty");
      expect(testBall.store).toEqual([]);
    });
    test("if using throw with now arguement when the ball is full should return the Pokemon", () => {
      const testBall = new Pokeball();
      const rattata = new Rattata("ratty", 65, 20);
      testBall.throw(rattata);
      expect(testBall.throw()).toEqual(rattata);
    });
    test(".isEmpty should return the correct boolean", () => {
      const testBall = new Pokeball();
      expect(testBall.isEmpty()).toBe(true);
      const rattata = new Rattata("ratty", 65, 20);
      testBall.throw(rattata);
      expect(testBall.isEmpty()).toBe(false);
    });
    test(".contains should return the name of the Pokemon stored or whether it is empty", () => {
      const testBall = new Pokeball();
      expect(testBall.contains()).toBe("empty ...");
      const rattata = new Rattata("ratty", 65, 20);
      testBall.throw(rattata);
      expect(testBall.contains()).toBe("ratty");
    });
  });
  describe("Trainer", () => {
    describe("Belt", () => {
      test("trainer has a belt that can hold pokeballs", () => {
        const trainer = new Trainer();
        expect(trainer.hasOwnProperty("belt")).toBe(true);
        expect(trainer.belt.length).toBe(6);
        expect(trainer.belt[0] instanceof Pokeball).toBe(true);
      });
    });
    describe(".catch", () => {
      test("should use an empty pokeball's throw method to catch a given pokemon", () => {
        const trainer = new Trainer();
        const rattata = new Rattata("ratty", 65, 20);
        trainer.catch(rattata);
        expect(trainer.belt[0].store[0]).toBe(rattata);

        const bulbasaur = new Bulbasaur("bulby", 65, 20);
        trainer.catch(bulbasaur);
        expect(trainer.belt[1].store[0]).toBe(bulbasaur);
      });

      test("Should return error message when all Pokeballs are full", () => {
        const trainer = new Trainer();
        const rattata = new Rattata("ratty", 65, 20);
        trainer.catch(rattata);
        trainer.catch(rattata);
        trainer.catch(rattata);
        trainer.catch(rattata);
        trainer.catch(rattata);
        trainer.catch(rattata);
        expect(trainer.catch(rattata)).toBe("All your Pokeballs are full!");
      });

      test("If pokemon caught, assigns trainer correctly", () => {
        const trainer = new Trainer("Ash");
        const rattata = new Rattata("ratty", 65, 20);
        trainer.catch(rattata);
        expect(rattata.trainer).toBe(trainer);
      });
    });
    describe(".getPokemon", () => {
      test("returns the pokemon entered as an argument, if found", () => {
        const trainer = new Trainer();
        const rattata = new Rattata("ratty", 65, 20);
        const bulbasaur = new Bulbasaur("bulby", 65, 20);
        const squirtle = new Squirtle("watery", 65, 20);

        trainer.catch(rattata);
        trainer.catch(bulbasaur);
        trainer.catch(squirtle);

        expect(trainer.getPokemon("ratty")).toBe(rattata);
        expect(trainer.getPokemon("watery")).toBe(squirtle);
      });
    });
  });
  describe("Battle!", () => {
    test("Battle should take two trainers and two Pokemon as arguements", () => {
      const jessica = new Trainer();
      const joe = new Trainer();
      const rattata = new Rattata("ratty", 65, 20);
      const bulbasaur = new Bulbasaur("bulby", 65, 20);
      jessica.catch(rattata);
      joe.catch(bulbasaur);
      const newBattle = new Battle(jessica, joe, "ratty", "bulby");
      expect(newBattle.trainer1).toBe(jessica);
      expect(newBattle.trainer2).toBe(joe);
      expect(newBattle.trainer1pokemon).toBe(rattata);
      expect(newBattle.trainer2pokemon).toBe(bulbasaur);
    });
    describe(".fight", () => {
      test("pokemon given as an arguement can damage the other pokemon in the battle", () => {
        const jessica = new Trainer();
        const joe = new Trainer();
        const rattata = new Rattata("ratty", 65, 20);
        const bulbasaur = new Bulbasaur("bulby", 25, 10);
        jessica.catch(rattata);
        joe.catch(bulbasaur);
        const newBattle = new Battle(jessica, joe, "ratty", "bulby");
        newBattle.fight(newBattle.trainer1pokemon);
        expect(bulbasaur.hitPoints).toBe(5);
        newBattle.fight(newBattle.trainer2pokemon);
        expect(rattata.hitPoints).toBe(55);
      });

      test("if defending pokemon is weak to the attacking pokemon it takes more damage", () => {
        const jessica = new Trainer();
        const joe = new Trainer();
        const charmander = new Charmander("firey", 65, 20);
        const bulbasaur = new Bulbasaur("bulby", 45, 10);
        jessica.catch(charmander);
        joe.catch(bulbasaur);
        const newBattle = new Battle(jessica, joe, "firey", "bulby");

        newBattle.fight(newBattle.trainer1pokemon);

        expect(bulbasaur.hitPoints).toBe(20);
      });

      test("if defending pokemon is strong to the attacking pokemon it takes less damage", () => {
        const jessica = new Trainer("jessica");
        const joe = new Trainer("joe");
        const charmander = new Charmander("firey", 65, 20);
        const bulbasaur = new Bulbasaur("bulby", 45, 20);
        jessica.catch(charmander);
        joe.catch(bulbasaur);
        const newBattle = new Battle(jessica, joe, "firey", "bulby");

        newBattle.fight(newBattle.trainer2pokemon);

        expect(charmander.hitPoints).toBe(50);
      });

      test("when defending pokemon faints, returns an appropriate message", () => {
        const jessica = new Trainer("jessica");
        const joe = new Trainer("joe");
        const charmander = new Charmander("firey", 65, 100);
        const bulbasaur = new Bulbasaur("bulby", 45, 20);
        jessica.catch(charmander);
        joe.catch(bulbasaur);
        const newBattle = new Battle(jessica, joe, "firey", "bulby");

        expect(newBattle.fight(newBattle.trainer1pokemon)).toBe(
          "bulby fainted!"
        );
        expect(bulbasaur.hasFainted()).toBe(true);
      });
    });
  });
});
