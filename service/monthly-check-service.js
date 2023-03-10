import Garden from '../models/garden-model.js';
import Status from '../models/status-model.js';
import Facility from '../models/facility-model.js';
import MonthlyCheck from '../models/monthly-report-model.js';
import UserDto from '../dtos/user-dto.js';
import ApiErrors from '../exceptions/api-errors.js';

class MonthlyCheckService {
  async create(facilityData) {
    const { facilityId, facilityStatus } = facilityData;
    const candidate = await MonthlyCheck.findOne({ facilityId });

    if (candidate) {
      throw ApiErrors.BadRequest(`MonthlyCheck for this facility: ${facilityId} already exists`);
    }

    const status = await Status.findOne({ value: facilityStatus });
    const facility = await Facility.findOne({ facilityId });

    const check = new MonthlyCheck({
      facility: facility._id,
      facilityStatus: status.value,
    });
    const monthlyCheck = await check.save();
    return monthlyCheck;
  }

  async update(id, data) {
    const updatedGarden = await Garden.findByIdAndUpdate(id, { $set: data }, { new: true });
    return updatedGarden;
  }

  async delete(id) {
    const deletedGarden = await Garden.findByIdAndDelete(id);
    return deletedGarden;
  }
}

export default new MonthlyCheckService();
