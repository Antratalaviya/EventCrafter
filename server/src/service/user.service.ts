import mongoose, { PipelineStage } from "mongoose";
import { UserInput } from "../constants";
import { User } from "../model/user.model";

const getUserById = async (id: string) => {
  return await User.findById(id).select("-__v");
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select("-__v");
};

const register = async (body: UserInput) => {
  return await User.create(body);
};

const likeEventByUser = async (eventId: string, userId: string) => {
  let user = await User.findOne({
    likedEvent: { $in: [new mongoose.Types.ObjectId(eventId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(userId, {
      $pull: {
        likedEvent: new mongoose.Types.ObjectId(eventId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(userId, {
    $push: {
      likedEvent: new mongoose.Types.ObjectId(eventId)
    }
  }, { new: true })

}

const saveEventByUser = async (eventId: string, userId: string) => {
  let user = await User.findOne({
    savedEvent: { $in: [new mongoose.Types.ObjectId(eventId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(userId, {
      $pull: {
        savedEvent: new mongoose.Types.ObjectId(eventId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(userId, {
    $push: {
      savedEvent: new mongoose.Types.ObjectId(eventId)
    }
  }, { new: true })

}

const getSavedEventByUser = async (userId: string) => {
  const pipeline: PipelineStage[] = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "events",
        localField: 'savedEvent',
        foreignField: "_id",
        as: "eventSaved"
      }
    },
    {
      $unwind: {
        path: '$eventSaved',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        eventSaved: 1
      }
    }
  ]

  return await User.aggregate(pipeline);
}

const getLikedEventByUser = async (userId: string) => {
  const pipeline: PipelineStage[] = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "events",
        localField: 'likedEvent',
        foreignField: "_id",
        as: "eventLiked"
      }
    },
    {
      $unwind: {
        path: '$eventLiked',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        eventLiked: 1
      }
    }
  ]

  return await User.aggregate(pipeline);
}

const subscribeUser = async (subscriberId: string, subscribedToId: string) => {
  let user = await User.findOne({
    subscriber: { $in: [new mongoose.Types.ObjectId(subscribedToId)] }
  })
  if (user) {
    return await User.findByIdAndUpdate(subscriberId, {
      $pull: {
        subscriber: new mongoose.Types.ObjectId(subscribedToId)
      }
    }, { new: true })
  }
  return await User.findByIdAndUpdate(subscriberId, {
    $push: {
      subscriber: new mongoose.Types.ObjectId(subscribedToId)
    }
  }, { new: true })
}

export default {
  getUserById,
  getUserByEmail,
  register,
  likeEventByUser,
  saveEventByUser,
  getSavedEventByUser,
  subscribeUser,
  getLikedEventByUser
};
