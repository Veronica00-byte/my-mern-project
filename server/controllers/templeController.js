import Temple from '../models/Temple.js';

const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find({});
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (temple) {
      res.json(temple);
    } else {
      res.status(404).json({ message: 'Temple not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTemple = async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getTemples, getTempleById, createTemple };