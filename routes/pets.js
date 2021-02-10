const express = require('express');
const router = express.Router();
const Joi = require('joi');

const pets = require('../controller/petsController');

const schema = Joi.object({
    animalname: Joi.string().min(3).required(),
    intakereason: Joi.string().required(),
    istransfer: Joi.number(),
    istrial: Joi.number().default(0),
    sexname: Joi.string().pattern(/^Female|Male$/).required() //regex, busca una u otra palabra
});

const schema2 = Joi.object({
    animalname: Joi.string().min(3),
    intakereason: Joi.string(),
    istransfer: Joi.number(),
    istrial: Joi.number().default(0),
    sexname: Joi.string().pattern(/^Female|Male$/) //regex, busca una u otra palabra
});

router.get('/', (req, res) => {
    const {id = null} = req.query;

    if(id === null) res.status(200).send(pets.getAllPets());
    else res.status(200).send(pets.getPet(id));
});

router.get('/specie:species', (req, res) =>{
    const {species} = req.params;
    res.status(200).send(pets.getPetBySpecies(species));
});

router.get('/intakereason:reason', (req, res) =>{
    const {reason} = req.params;
});

router.post('/', (req, res) =>{
    const body = req.body;
    const {istransfer, istrial, animalname, intakereason, sexname} = req.body;

    const result = schema.validate({animalname, intakereason, 
                                    istransfer, istrial, sexname});
    if(result.error) return res.status(400).send(result.error.details[0].message);
    const pet = pets.createPet(body);

    res.send(pet);
});

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const body = req.body;
    const {istransfer, istrial, animalname, intakereason, sexname} = req.body;

    const result = schema2.validate({animalname, intakereason, 
                                    istransfer, istrial, sexname});
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const {pet, error} = pets.updatePet(id, body);
    if(error) return next();
    res.send(pet);

});

router.delete('/id', (req, res) =>{
    const {id} = req.params;
    return pets.deletePet(id);
});

module.exports = router;