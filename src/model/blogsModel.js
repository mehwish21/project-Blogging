const mongoose = require('mongoose')
const Object_id = mongoose.schema.types.Object_id

const blogsSchema = new mongoose.schema({

    
        title: { type: String, required: true },
        body: { type: String, required: true },
        authorId: {
            type: Object_id,
            ref: Author
        },
        tag: [string],

        category: { type: string ,required:true},

        examples: [string],
         subcategory: [string] ,
        //   createdAt, updatedAt, deletedAt: 
          isDeleted: {type:boolean, default: false}, 
        //   publishedAt: {type:string}, 
          isPublished: { type:boolean, default: false}},

          {timestamps:true});

          module.exports=mongoose.model('Blog',blogsSchema)
    

    
