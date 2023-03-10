import gardenService from '../service/garden-service.js';

class GardenController {
  async create(req, res, next) {
    try {
      const gardenData = await gardenService.create(req.body);
      return res.json({ 'Garden created': `${gardenData._id}`, gardenData });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const updatedGarden = await gardenService.update(req.params.id, req.body);
      return res.json(updatedGarden);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const deletedGarden = await gardenService.delete(req.params.id);
      return res.json(`Garden: ${deletedGarden._id} deleted`);
    } catch (error) {
      next(error);
    }
  }
  async getGardens(req, res, next) {
    try {
      const gardens = await gardenService.getAllGardens();
      return res.json(gardens);
    } catch (error) {
      next(error);
    }
  }

  async getGarden(req, res, next) {
    try {
      const garden = await gardenService.getGarden(req.params.id);
      return res.json(garden);
    } catch (error) {
      next(error);
    }
  }
}

export default new GardenController();
