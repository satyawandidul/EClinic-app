import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory, Stock, StockDocument } from './stock.schema';
import { Model } from 'mongoose';
import { log } from 'console';

@Injectable()
export class StockService {
    constructor(
        @InjectModel(Stock.name) private readonly stockModel: Model<StockDocument>
    ) { }

    async findAll() {
        return await this.stockModel.find().exec()
    }

    async findOne(locationCode: string) {
        return await this.stockModel.findOne({ locationShortCode: locationCode }).exec()
    }

    // Create
    // Check if the location exists
    // if yes, add it to the existing array
    // if not, create a new entry.
    async create(stock: Stock) {        
        const exists = await this.stockModel.findOne({locationShortCode: stock.locationShortCode}).exec()
        if (exists) {
            const newArray = [...exists.inventory, ...stock.inventory]   
            return await this.stockModel.findByIdAndUpdate(exists.id, {inventory: newArray}, {new: true})
        } else {
            const created = new this.stockModel(stock)
            await created.save()
            return created
        }
    }

    // Update stock for billing
    async update(stock: Stock) {
        let i = 0
        const exists = await this.stockModel.findOne({ locationShortCode: stock.locationShortCode }).exec()
        if (exists) {
            // check if the barcode exists in the list, delete it if exists
            const newArray = exists.inventory.filter((item) => {
                for (i = 0; i < stock.inventory.length; i++) {
                    // console.log('item.barcode = ' + item.barcode);
                    // console.log('stock.barcode =' + stock.inventory[i].barcode);
                    if (item.barcode === stock.inventory[i].barcode) {
                        // Match found, so don't take that value.
                        return false
                    } 
                }
                return true  // Take the value if it doesn't match to any
            })
            // console.log(newArray);
            return await this.stockModel.findByIdAndUpdate(exists.id, { inventory: newArray }, { new: true })
        }
    }
}
