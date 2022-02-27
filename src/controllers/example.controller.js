const Services = require("../services/services");
const service = new Services("tasks");
const controller = {};

//Listamos todos los tasks
controller.list = async (req, res) => {
  try {
    const data = await service.List();
    if (!data.status) return res.status(400).json(data);

    return res.status(200).json(data.data);
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

// //Obtenemos un solo task
controller.get = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.Get(id);
    if (!data.status) return res.status(400).json(data);

    return res.status(200).json(data.data);
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

//Creamos un nuevo task
controller.create = async (req, res) => {
  try {
    const result = await service.Create(req.body);
    if (!result.status) return res.status(400).json(result);

    return res.status(200).json({ status: true, message: "success" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

//Actualizamos un task
controller.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.Update(id, req.body);
    if (!result.status) return res.status(400).json(result);

    return res.status(200).json({ status: true, message: "success" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

//Eliminamos un task
controller.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.Delete(id);
    if (!result.status) return res.status(400).json(result);

    res.status(200).json({ status: false, message: "success" });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

module.exports = controller;
