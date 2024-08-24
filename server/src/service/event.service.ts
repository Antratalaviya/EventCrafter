import mongoose, { PipelineStage } from "mongoose";
import { EventInput } from "../constants";
import { Event } from "../model/event.model";
/**
 * @param userId 
 * @param event 
 * @returns 
 */
const createEvent = async (userId: string, event: EventInput) => {
    return await Event.create({
        ...event,
        owner: userId,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
    })
}

/**
 * @param userId 
 * @returns 
 */

/**
 title,category, type, photos,start-date, time-both, carCapacity, street, city, country,description, offers, 
 name, surname, subscriber, 
 */

const getEventByUserId = async (userId: string, page: number, limit: number, keyword: string, eventStatus: string, eventType: string, sortby: string) => {
    const pipeline: PipelineStage[] = [];
    pipeline.push({
        $match: { owner: new mongoose.Types.ObjectId(userId) }
    })
    if (keyword) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: new RegExp(keyword, 'i') } },
                    { description: { $regex: new RegExp(keyword, 'i') } }
                ]
            }
        })
    }
    if (eventStatus) {
        pipeline.push({
            $match: { status: { $eq: eventStatus } }
        })
    }
    if (eventType) {
        pipeline.push({
            $match: { type: { $eq: eventType } }
        })
    }
    pipeline.push({
        $skip: (page - 1) * limit
    }, {
        $limit: limit
    })
    if (sortby === 'asc') {
        pipeline.push({
            $sort: {
                createdAt: 1
            }
        })
    } else if (sortby === 'desc') {
        pipeline.push({
            $sort: {
                createdAt: -1
            }
        })
    }
    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: "likedBy",
                foreignField: "_id",
                as: "likedByUsers"
            }
        }
        ,
        {
            $project: {
                _id: 1,
                category: 1,
                type: 1,
                photos: 1,
                startDate: 1,
                startTime: 1,
                endTime: 1,
                carCapacity: 1,
                street: 1,
                city: 1,
                country: 1,
                description: 1,
                offers: 1,
                status: 1,
                name: '$user.name',
                surname: '$user.surname',
                subscriber: "$user.subscriber",
                price: 1,
                likedBy: { $size: '$likedByUsers' },
                participants: 1
            }
        }
    )

    return await Event.aggregate(pipeline)
}

const getEventById = async (eventId: string) => {
    return await Event.findById(eventId);
}

const likedEventByUser = async (eventId: string, userId: string) => {
    let event = await Event.findOne({
        likedBy: { $in: [new mongoose.Types.ObjectId(userId)] }
    })
    if (event) {
        return await Event.findByIdAndUpdate(eventId, {
            $pull: {
                likedBy: new mongoose.Types.ObjectId(userId)
            }
        }, { new: true })
    }
    return await Event.findByIdAndUpdate(eventId, {
        $push: {
            likedBy: new mongoose.Types.ObjectId(userId)
        }
    }, { new: true })
}

export default {
    createEvent,
    getEventByUserId,
    getEventById,
    likedEventByUser
}