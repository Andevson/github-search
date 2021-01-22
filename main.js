function updateUser(user){
    if(user.name == null){
        user.name = "Não há dados.";
    }
    if(user.bio == null){
        user.bio = "Não há dados.";
    }
    document.getElementById("render-users").innerHTML = 
    `
        <img src = "${user.avatar}" class = "img-fluid rounded p-4" alt="Responsive image"></img>
        <p class = "border">Nome : ${user.name}</p>
        <p class = "border">Bio : ${user.bio}</p>
    `;
}
function updateRepos(repos){
    var htmlRepos = "";
    function updateEachRepos(item){
        htmlRepos +=
        `
            <div class = "border p-2">
                <p>Name : ${item.name}</p>
                <p>Description : ${item.description}</p>
                <p><a href = "${item.html_url}">link</a></p>
            </div>
        `;
    }
    repos.u.forEach(updateEachRepos);
    document.getElementById("render-repos").innerHTML = htmlRepos;
}

function getUser(userName){
    async function getUserData(userName){
        const userResult = await fetch(`https://api.github.com/users/${userName}`);
        const person =  userResult.json();
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
function getRepos(userName){
    async function getReposData(userName){
        const reposResult = await fetch(`https://api.github.com/users/${userName}/repos`);
        const repository =  reposResult.json();
        return repository;
    }
    userData = getReposData(userName).then(
        u => updateRepos({
                u
            })
    );
}
function searchUser(){
    let userInput = document.getElementById("get-user-input").value;
    if(userInput != ""){
        getUser(userInput);
        getRepos(userInput);
    }else{
        alert("Digite um id de usuário");
    }
}
function authentication(login, password){
    if(login == "admin" && password == "password"){
        window.localStorage.setItem("login", login);
        document.getElementById("login-a").innerHTML = 
        `
            <a href = "user-search.html" style = "color : white;">Entrar</a>
        `;
        
    }else{
        alert("Usuário ou senha inválidos");
    }
}
function logIn(){
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    authentication(login, password);
}

document.getElementById("login-span").innerHTML = window.localStorage.getItem("login");