import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Recipes = new Mongo.Collection('recipes');

Recipes.allow({
  insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  },
  remove: function(userId, doc){
    return !!userId;
  }
})

// Ingredient = new SimpleSchema({
//   name: {
//     type: String,
//     label: "Name"
//   },
//   amout: {
//     type: String,
//     label: "Amount"
//   }
// })

RecipeSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
  },
  desc: {
    type: String,
    label: "Description"
  },
  ingredients: {
    type: Array,
    label: 'Ingredients'
  },
  "ingredients.$": Object,
  "ingredients.$.name": String,
  "ingredients.$.amount": String,
  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function(){
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function(){
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  toggleMenuItem: function(id, currentState){
    Recipes.update(id, {
      $set: {
        inMenu: !currentState
      }
    });
  },
  deleteRecipe: function(id){
    Recipes.remove(id);
  }
});

Recipes.attachSchema( RecipeSchema );
