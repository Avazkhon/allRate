const auth = store => next => action => {
  next(action);
  return fetch('http://localhost:8080/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    credentials: "include",
    body: JSON.stringify({}),
  })
}
export default auth;
