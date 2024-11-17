import mongoose, { plugin, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const videoSchema = new Schema (
    {
      videoFile: {
        type: String, // cloudnary url
        required: true,
      },
      thumbnail: {
        type: String, // cloudnary url
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: string, 
        required: true,
      },
      duration: {
        type: Number, // cloudnary url
        required: true,
      },
      views: {
        type: Number, 
        default: 0,  // Otherwise it will show any views uneccessary
      },
      isPublished: {
        type: Boolean,
        default: true, 
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    }, { timestamps: true })


videoSchema.plugin(mongooseAggregatePaginate)  // we add the middlewares, plugins
// go to "mongoose" documentation-> middleware -> pre, post etc.
// pre - do something just before the data is going to be saved
// post - --;;-- just after the data has been saved


export const Video = mongoose.model("Video", videoSchema) 