// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; 

// GET REQUEST
function getTodos() {
  //limit=5 will limit the data upto 5 record 
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
axios({
  method: 'post',
  url: "https://jsonplaceholder.typicode.com/todos",
  data:{
    title: 'New Todo',
    completed: 'false'
  }
})
  .then(res=> showOutput(res))
  .catch(err=>console.log(err))

}

// PUT/PATCH REQUEST 
/*  put replace the previous data
    patch will make changes in previous data */
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', //1 is to update first record
  {
    
    completed: true
  })
  .then(res=> showOutput(res))
  .catch(err=> console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res=> showOutput(res))
  .catch(err=> console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
  ])
  .then(res=>{
    console.log(res[0]);//for first url
    console.log(res[1]);//for second url
    showOutput(res[1]);
  })
  .catch(err=>console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config ={
    headers:{
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };
  axios.post('https://jsonplaceholder.typicode.com/todos',
  {
    title: 'New Todo',
    completed: false
  },config)
  .then(res=>showOutput(res))
  .catch(err=>console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
 const options ={
  methos: 'post',
  url: 'https://jsonplaceholder.typicode.com/todos',
  data:{
    title:'Hello world'
  },
  transformResponse: axios.defaults.transformResponse.concat(data=>{
    data.title = data.title.toUpperCase();
    return data;
  })
 }
 axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
  .then(res=>showOutput(res))
  .catch(err=>{
  if(err.response){
    //server resomded with a status other than 200 range
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    if(err.response.status === 400){
      alert('Error: Page Not Found');
    }
    else if(err.request){
      console.log(err.request);
    }
  }});

}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.cancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todoss'),{
    cancelToken:source
  }
  .then(res=>showOutput(res))
  .catch(thrown=>{
  if(axios.isCancel(thrown)){
    console.log('Request canceled', thrown.message);
  }});
  if(true){
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
/*Axios interceptors are the default configurations that are added automatically to every request 
  or response that a user receives. It is useful to check response status code for every response that is being received.  */
axios.interceptors.request.use(config =>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
   return config;
})

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

axiosInstance.get('/comments').then(res=>{
  showOutput(res);
})

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
