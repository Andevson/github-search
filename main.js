function getUser(userName){
    userData = async function getUserData(userName){
        const result = await fetch(`https://api.github.com/users/${userName}`);
        const person =  result.json();
        return person;
    }();
    userData.then(
        u => {
            user = {
                name : u.name,
                bio : u.bio,
                url : u.url,
                avatar : user.avatar_url
            };
        }
    );
}
var user;
getUser("andevson");
//console.log(usuario.name);