import Garden from '../models/garden-model.js';
import Facility from '../models/facility-model.js';
import ApiErrors from '../exceptions/api-errors.js';

class GardenService {
  async create(gardenData) {
    const { serialNumber } = gardenData;
    const candidate = await Garden.findOne({ serialNumber });
    if (candidate) {
      throw ApiErrors.BadRequest(`garden with this serial: ${serialNumber} already exists`);
    }

    const newGarden = new Garden(gardenData);

    const savedGarden = await newGarden.save();
    console.log('controller');

    return savedGarden;
  }

  async update(id, data) {
    const updatedGarden = await Garden.findByIdAndUpdate(id, { $set: data }, { new: true });
    return updatedGarden;
  }

  async delete(id) {
    const candidate = await Garden.findOne({ id });
    if (candidate) {
      candidate.facilities.forEach(async (f) => {
        const deletedFacilities = await Facility.deleteMany({ _id: f._id });
      });
    }

    const deletedGarden = await Garden.findByIdAndDelete(id);

    return deletedGarden;
  }

  async getAllGardens() {
    const gardens = await Garden.find();
    return gardens;
  }

  async getGarden(id) {
    const candidate = await Garden.findById(id).populate('facilities');
    if (!candidate) {
      throw ApiErrors.BadRequest(`garden with this serial: ${serialNumber} doesn't exists`);
    }
    return candidate;
  }
}

export default new GardenService();
