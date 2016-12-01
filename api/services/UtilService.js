module.exports = {
  /**
  * this function takes a value and tranforms the key
  **/
  keyTransform: function(mapper, items ,type='array'){
    if(!items) {
      return false
    }

  return  items.map(item => {
      let remappedKey=  _.mapKeys(item,(v,k)=>{
         if(mapper[k]){
           console.log('mapper successfully ')
           return mapper[k]
         }else{
           return k
         }
         return k
     })
     console.log(remappedKey)
     return remappedKey
    })
  }
}
