const mongoose = require('mongoose')
const Object_id = mongoose.schema.types.Object_id

const blogsSchema = new mongoose.schema({

    
        title: { type: String, required: true },
        body: { type: String, required: true },
        authorId: {
            type: Object_id,
            ref: Author
        },
        tag: [String],

        category: { type: String ,required:true},

        examples: [String],
         subcategory: [String] ,
        //   createdAt, updatedAt, deletedAt: 
          isDeleted: {type:Boolean, default: false}, 
        //   publishedAt: {type:string}, 
          isPublished: { type:Boolean, default: false}},

          {timestamps:true});

          module.exports=mongoose.model('Blog',blogsSchema)
    

    
