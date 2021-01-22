function updateUser(user){
    if(user.name == null){
        user.name = "Não há dados.";
    }
    if(user.bio == null){
        user.bio = "Não há dados.";
    }
    document.getElementById("header").innerHTML = 
    `
        <img width = "100px" height = "100px" src = "${user.avatar}"></img>
        <p>${user.name}</p>
        <p>${user.bio}</p>
    `;
}
function getUser(userName){
    async function getUserData(userName){
        const result = await fetch(`https://api.github.com/users/${userName}`);
        const person =  result.json();
        console.log(person);
        return person;
    }
    userData = getUserData(userName).then(
        u => updateUser({
                name : u.name,
                bio : u.bio,
                url : u.url,
                avatar : u.avatar_url
            })
    );
}
function searchUser(){
    getUser(document.getElementById("get-user-input").value);
}
function authentication(login, password){
    if(login == "admin" && password == "password"){
        window.localStorage.setItem("login", login);
        window.pathname = '/user-search.html';
    }else{
        alert("Usuário ou senha inválidos");
    }
}
function logIn(){
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    authentication(login, password);
}