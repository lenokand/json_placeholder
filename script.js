const tbody = document.querySelector('#album-table > tbody')
const tbodyPosts = document.querySelector('#posts-table > tbody')

const modalBody = document.querySelector('#modalBody')
const commentsList = []
const users = []

// запрос к списку пользователей
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(json => {
    json.forEach(user => {
        users.push(user)
       


    })

    renderAlbums()

      })

// запрос к списку коментариев 
fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
          json.forEach(comment => {
              commentsList.push(comment)
             
          })

          renderPosts()
            })

function renderAlbums(){
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        json.forEach((album, index) => {

            let usersData = users.find((user) => user.id === album.userId)
            

            let tr = document.createElement('tr')

            let tdId = document.createElement('td')
            let tdTitle = document.createElement('td')
            let tdUsername = document.createElement('td')
            let tdEmail = document.createElement('td')

            tdId.textContent = album.id
            tdTitle.innerHTML = `<a href='#' >${album.title}</a>`
            tdUsername.textContent = usersData.name
            tdEmail.innerHTML = `<a href='mailto:${usersData.email}' >${usersData.email}</a>`

            tr.appendChild(tdId)
            tr.appendChild(tdTitle)
            tr.appendChild(tdUsername)
            tr.appendChild(tdEmail)

            tbody.appendChild(tr)

        })
        
             

        const albumLinks = document.querySelectorAll('a[data-bs-toggle="modal"]')

        albumLinks.forEach ( link => {
            link.onclick = function(e) {
                e.preventDefault()
                console.log(this);
            }
        })

        $('#album-table').DataTable();

    })
}



   


function renderPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {



  
        json.forEach((post,index) => {
            let comentData = commentsList.filter((comment) => post.id === comment.postId)
            let usersData = users.find((user) => user.id === post.userId)

            let comentDataLth = comentData.length
            // console.log(commentsList.filter((comment) => post.id === comment.postId))
            // console.log(commentsList.filter((comment) => post.id === comment.postId).length)

            let tr = document.createElement('tr')

            let userId = document.createElement('td')
            let postId = document.createElement('td')
            let postTitle = document.createElement('td')
            let postBody = document.createElement('td')
            
            
            userId.textContent = usersData.name
            postId.textContent = post.id
            postTitle.innerHTML = `${post.title} <a href='#' class='modal-open' data-bs-toggle="modal" data-bs-target="#modal"  data-coment-id="${post.id}"> (${comentDataLth})</a>` //колличество коментов и ссылка на них
            postBody.textContent = post.body
            // console.log(post.id)
            
            tr.appendChild(postId)
            tr.appendChild(userId)
           
            tr.appendChild(postTitle) //колличество коментов и ссылка на них
            tr.appendChild(postBody)

            tbodyPosts.appendChild(tr)

        })
        
    
        const comentLinks = document.querySelectorAll('a[data-bs-target="#modal"]')

        comentLinks.forEach(link => {
                link.onclick = function(e) {
                    e.preventDefault()
                   
                    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.getAttribute('data-coment-id')}`)
                        .then(response => response.json())
                        .then(json => {
                            console.log(json)
                            json.forEach(coment => {

                                let tr = document.createElement('tr')

                                let comId = document.createElement('td')
                                let  comName= document.createElement('td')
                                let comEmail = document.createElement('td')
                                let comBody = document.createElement('td')
                                
                                
                                comId.textContent = coment.id
                                comName.textContent = coment.name
                                comEmail.innerHTML = `<a href='mailto:${coment.email}' >${coment.email}</a>`
                                comBody.textContent = coment.body
                                
                                
                                tr.appendChild(comId)
                                tr.appendChild(comName)
                               
                                tr.appendChild(comEmail) //колличество коментов и ссылка на них
                                tr.appendChild(comBody)
                    
                                modalBody.appendChild(tr)


                            })
                        })
                }
            })


        $('#posts-table').DataTable();      

    })

}



    

    
