import express from 'express';
import { Thing } from '../models/Todo.js';

const router = express.Router();

//Uuden tallentaminen:
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title',
      });
    }
    const newThing = {
      title: request.body.title
    };

    const thing = await Thing.create(newThing);
    return response.status(201).send(thing);
  } catch(error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Hae kaikki tietokannasta
router.get('/', async (request, response) => {
  try {
    const things = await Thing.find({});

    return response.status(200).json({
      count: things.length,
      data: things
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Hae yksi asia tietokannasta id:n perusteella
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const thing = await Thing.findById(id);

    return response.status(200).json(thing);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Päivitä asia:
router.put('/:id', async (request, response) => {
  try {
    if(
    !request.body.title
  ) {
    return response.status(400).send({
      message: 'Send all required fields: title',
    });
  }
  const { id } = request.params;
  const result = await Thing.findByIdAndUpdate(id, request.body, { new: true });
  if (!result) {
    return response.status(404).json({ message: 'Not found' });
  }
  return response.status(200).send({ message: 'Update success' });
 } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});  

//Deletointi:
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    console.log('Deleting item with ID:', id);
    const result = await Thing.findByIdAndDelete(id);

    if(!result) {
      return response.status(404).json({ message: 'Not found' });
    }
  return response.status(200).send({ message: 'Deleted successfully'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});    

export default router;