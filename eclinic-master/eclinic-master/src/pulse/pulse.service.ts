import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pulse, PulseDocument } from './pulse.schema';

@Injectable()
export class PulseService {
    constructor(
        @InjectModel(Pulse.name) private readonly pulseModel: Model<PulseDocument>
    ) { }

    async findAll() {
        return await this.pulseModel.find().exec()
    }

    async create(pulse: Pulse) {
        const created = new this.pulseModel(pulse)
        await created.save()
        return created
    }

    async update(id: string, pulse: Pulse) {
        return await this.pulseModel.findByIdAndUpdate(id, pulse, { new: true })
    }
}
