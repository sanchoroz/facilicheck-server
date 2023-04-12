import Garden from '../models/garden-model.js';
import Facility from '../models/facility-model.js';
import ApiErrors from '../exceptions/api-errors.js';

class FacilityService {
  async create(gardenId, facilityData) {
    const candidate = await Garden.findOne({ gardenId });

    if (!candidate) {
      throw ApiErrors.BadRequest(`garden with this id: ${gardenId} doesn't exists`);
    }

    const newFacility = new Facility(facilityData);
    const savedFacility = await newFacility.save();

    const updatedGarden = await Garden.findByIdAndUpdate(
      gardenId,
      { $push: { facilities: savedFacility._id } },
      { new: true },
    );
    console.log('updatedGarden ', updatedGarden);
    return savedFacility;
  }

  async update(id, data) {
    const updatedFacility = await Facility.findByIdAndUpdate(id, { $set: data }, { new: true });
    return updatedFacility;
  }

  async delete(id) {
    const deletedFacility = await Facility.findByIdAndDelete(id);
    const garden = await Garden.findOne({ facilities: { $eq: id } });
    garden.facilities.pull(id);
    await garden.save();
    return deletedFacility;
  }

  async getAllFacilities() {
    const facilities = await Facility.find().populate('garden');
    return facilities;
  }

  async getFacility(id) {
    const facility = await Facility.findById(id).populate('garden');
    return facility;
  }
}

export default new FacilityService();
