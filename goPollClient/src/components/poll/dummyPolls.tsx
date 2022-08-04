function getRandomDate() {
    var date = new Date()
    var day = date.getDay().toString()
    var month = date.getMonth().toString()
    var year = date.getFullYear().toString()
    return day + '/' +  month + '/' + year
 }


 export const data = [{
    id: 1,
    name: 'Dogs or Cats?',
    dateCreated: getRandomDate().toString(),
    votes: 50
  },{
    id: 2,
    name: 'Gryfindor or Slytherin?',
    dateCreated: getRandomDate().toString(),
    votes: 50
  },{
    id: 3,
    name: 'Favourite Movie',
    dateCreated: getRandomDate().toString(),
    votes: 50
  },{
    id: 4,
    name: 'Favourite Song',
    dateCreated: getRandomDate().toString(),
    votes: 50
  }]

 