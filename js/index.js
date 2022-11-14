document.addEventListener('DOMContentLoaded', event => {
const searchForm = document.querySelector('#main')
const dataDisplay = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')
    
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formValue = document.querySelector('#search').value
        const userName = formValue.split(' ').join('')

        fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(res => res.json())
        .then(userData => {
            let resultArray = userData.items
            resultArray.map(function(user) {
                const loginID = user.login;
                const avatar = user.avatar_url;
                const identification = user.id
                let li = document.createElement('li');
                li.className = `newUser`
                li.innerHTML = `
                <img src = '${avatar}'/>
                <p>${loginID}</p>
                <p>ID#: ${identification}</p>
                `
                dataDisplay.appendChild(li);
                li.addEventListener('click', function () {
                    fetch(`https://api.github.com/users/${userName}/repos`)
                    .then(res => res.json())
                    .then(newUserRepoList => {
                        newUserRepoList.forEach(item => {
                           let repoLi = document.createElement('li');
                           repoLi.innerHTML = `
                           Name: ${item.name}
                           ID#: ${item.id}
                           URL: ${item.url}
                           `
                           repoList.appendChild(repoLi);
                        })
                    })
                })
            }) 
        })
    })
})