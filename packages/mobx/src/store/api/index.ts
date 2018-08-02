export const getItems = () =>
  fetch('http://jsonplaceholder.typicode.com/users').then(response =>
    response.json()
  )
