import { Meteor } from 'meteor/meteor';
import { Products } from '../both/collection.js';
Meteor.startup(() => {
  Meteor.methods({
    'insertData'(obj) {
      return Products.insert(obj);
    },
    'getAllData'() {
      return Products.find().fetch();
    },
    'removeItem'(id) {
      return Products.remove({ _id: id })
    },
    'updateData'(id,obj){
      return Products.update({_id:id},{$set:obj});
    },
    'getOneItem'(){
      
    }
  })
});
