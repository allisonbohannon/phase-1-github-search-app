//Create event listener for search form
document.querySelector('#github-form').addEventListener('submit', (e) => {
    e.preventDefault(); 
    const searchTerm = document.querySelector("#search").value
    fetchUserProfiles(searchTerm); 
})

//Create GET requiest to API based on user input
function fetchUserProfiles(searchTerm) { 
    const splitSearchTerm = searchTerm.split(' ')
    const formattedSearchTerm = splitSearchTerm.join('+')
    fetch(`https://api.github.com/search/users?q=${formattedSearchTerm}`, {
        headers: {"Accept": "application/vnd.github.v3+json"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.items)
        data.items.forEach(user => renderUser(user))
    })

}

//Render list of users

function renderUser(user) {
    console.log(user)
    const userCard = document.createElement('li')
    userCard.innerHTML = `
        <h2>${user.login}</h2>
        <img src = '${user.avatar_url}' />
        <p><a href = '${user.url}'>GitHub Profile</a></P
        `
     //Create listener on all user names
     userCard.querySelector('h2').addEventListener('click', () => {
         fetchUserRepos(user.login)
         //Clear out user list except selected
         document.getElementById('user-list').innerHTML = ''; 
         renderUser(user)
        })
     
    document.getElementById('user-list').appendChild(userCard); 
}

   
//Create GET request about selected user
function fetchUserRepos(userName) {
    fetch(`https://api.github.com/users/${userName}/repos`, {
        headers: {"Accept": "application/vnd.github.v3+json"}
    })
    .then(response => response.json())
    .then(data => data.forEach(repo => renderRepo(repo)))
}

//Render repositories of selected user
function renderRepo(repo) {
    //Clear out user list except user
    
    console.log(repo)
    const repoCard = document.createElement('li'); 
    repoCard.innerHTML = `
        <h2><a href ='${repo.git_url}'>Repository Name: ${repo.name}</a></h2>
        <h3>Languages Used: ${repo.language}</h3>
        `
    
    document.getElementById('repos-list').appendChild(repoCard)
}