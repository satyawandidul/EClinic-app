import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './locations.schema';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(Location.name) private readonly locationsModel: Model<LocationDocument>
    ) { }

    // Return all active locations from the system
    async findAll() {
        return await this.locationsModel.find({ isActive: true }).exec()
    }

    // Return specific location from the system
    async findOne(id: string) {
        return await this.locationsModel.findOne({ _id: id }).exec()
    }

    // Create a new location in the system
    async create(location: Location) {
        const created = new this.locationsModel(location)
        await created.save()
        return created
    }




    // Update a specific location in the system
    async update(id: string, location: Location) {
        return await this.locationsModel.findByIdAndUpdate(id, location, {
            new: true
        })
    }


    // Mark location as inactive in the system
    async delete(id: string) {
        return await this.locationsModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }
}
