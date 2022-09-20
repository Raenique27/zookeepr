const fs = require('fs');

const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("creates a zookeeper object" , () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "8",
            name: "Lernantino",
            age: 19,
            favoriteAnimal: "business cat",
        },
        {
            id: "9",
            name: "Les",
            age: 64,
            favoriteAnimal: 'rabbit',
        },
    ];
    const updatedZookeepers = filterByQuery({ age: 64}, startingZookeepers)
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "8",
            name: "Lernantino",
            age: 19,
            favoriteAnimal: "business cat",
        },
        {
            id: "9",
            name: "Les",
            age: 64,
            favoriteAnimal: "rabbit",
        },
    ];
    
    const result = findById("9", startingZookeepers);

    expect(result.name).toBe("Les");
});

test ("validates age", () => {
    const zookeeper = {
        id: "8",
        name: "Lernantino",
        age: 19,
        favoriteAnimal: "business cat",
    };

    const invalidZookeeper = {
        id: "8",
        name: "Les",
        age: "64",
        favoriteAnimal: "rabbit",
    };

    const result = validateZookeper(zookeeper);
    const result2 = validateZookeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});