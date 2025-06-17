import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    default:'1st'
  },
   isbn: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(\d{10}|\d{13})$/.test(v) || v === '';
      },
      message: props => `${props.value} is not a valid ISBN number!`
    },
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
  },
  description: {
    type: String,
    maxlength: 500
  },
  image: {
    type: String,
    required: true
  },
  isSold: {
    type: Boolean,
    default: false
  },
  sellerName:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  pinCode:{
    type:Number,
    required:true
  },
})

export const formModel = mongoose.model('BookForm', bookSchema);
