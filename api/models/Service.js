module.exports = {
  attributes: {
    name  : {
      type: 'string',
      required: true
    },
    isDeleted: {
      type:'boolean',
      defaultsTo: false
    }
  },
  validationMessages: {
      name : {
          required : ' Service Name is required'
      }
  }
}
