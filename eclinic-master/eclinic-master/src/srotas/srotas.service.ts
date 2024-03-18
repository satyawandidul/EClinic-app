import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Srotas, SrotasDocument } from './srotas.schema';

@Injectable()
export class SrotasService {
    constructor(@InjectModel(Srotas.name) private readonly srotasModel: Model<SrotasDocument>
    ) { }

    async findAll() {
        return await this.srotasModel.find().exec()
    }

    async create(srotas: Srotas) {
        const created = new this.srotasModel(srotas)
        await created.save()
        return created
    }

    async update(id: string, srotas: Srotas) {
        return await this.srotasModel.findByIdAndUpdate(id, srotas, { new: true })
    }
}
