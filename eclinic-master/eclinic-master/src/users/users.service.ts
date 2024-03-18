import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersModule } from './users.module';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly usersModel: Model<UserDocument>
    ) { }

    // Return all active users from the system
    async findAll() {
        return await this.usersModel.find({ isActive: true }).exec()
        // return await this.usersModel.find({isActive: true}, {username: 1, _id:0}).exec()
    }

    // Return specific user from the system
    async findOne(id: string) {
        return await this.usersModel.findOne({ _id: id }).exec()
    }

    // Create a new user in the system
    async create(user: User) {
        const created = new this.usersModel(user)
        await created.save()
        return created
    }


    // Update a specific user in the system
    async update(id: string, user: User) {
        return await this.usersModel.findByIdAndUpdate(id, user, {
            new: true
        })
    }


    // Mark user as inactive in the system
    async delete(id: string) {
        return await this.usersModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }
}
