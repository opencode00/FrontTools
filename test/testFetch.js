
//https://jsonplaceholder.typicode.com/users
const getDiario = async () =>{
    //const raw = await fetch("https://jsonplaceholder.typicode.com/users");
    const raw = await fetch("http://localhost:13594/diario");
    const data = await raw.json();
    // return data;
    //console.log(data)
    return data;
}
// // fetch("https://jsonplaceholder.typicode.com/users")
// fetch("http://localhost:13594/diario")
//     .then(response => response.json())
//     .then(json => console.log(json))


//getDiario()
console.log(getDiario())