const pets = require('../data.json');

function createPet(pet){
    let aux = {
        ...pet
    }
    aux.id = pets[pets.length -1].id + 23;
    pets.push(aux);

    return aux;
}   

function deletePet(id){
    const index = pets.findIndex(id => pets.id === id);
    const pet = pets.splice(index, index);
    return pet;
}

function updatePet(id, pet){
    try{
        const aux = pets.find(pet => pet.id == id);
        Object.assign(aux, pet);
        return {aux, error:null};
    }catch(err){
        return {aux:null, error:err};
    }
}

function getPet(id){
    const aux = JSON.parse(JSON.stringify(pets));
    return aux.find(pet => pet.id == id);
}

function getAllPets(){
    return pets;
}

function getPetBySpecies(specie){
    return pets.filter(pet => pet.speciesname == specie);
}

function getPetByReason(reason){
    return pets.filter(pet => pet.intakereason == reason);
}

module.exports = {
    createPet,
    deletePet,
    updatePet,
    getPet,
    getAllPets,
    getPetBySpecies,
    getPetByReason
}