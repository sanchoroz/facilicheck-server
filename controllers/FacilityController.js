import facilityService from '../service/facility-service.js';

class FacilityController {
  async create(req, res, next) {
    try {
      const facilityData = await facilityService.create(req.params.gardenId, req.body);
      return res.json({ 'Facility created': facilityData });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const updatedGarden = await facilityService.update(req.body);
      return res.json(updatedGarden);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      const deletedFacility = await facilityService.delete(req.params.id);
      return res.json(`Facility: ${deletedFacility._id} deleted`);
    } catch (error) {
      next(error);
    }
  }
  async getFacilities(req, res, next) {
    try {
      const facilities = await facilityService.getAllFacilities();
      return res.json(facilities);
    } catch (error) {
      next(error);
    }
  }

  async getFacility(req, res, next) {
    try {
      const facility = await facilityService.getFacility(req.params.id);
      return res.json(facility);
    } catch (error) {
      next(error);
    }
  }
}

export default new FacilityController();
