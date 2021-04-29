const postsContainer= document.getElementById('posts-container')
const loader= document.querySelector('.loader')
const filter= document.getElementById('filter')

const limit= 4
let page= 1

// fetching posts
const fetchPosts= async () => {
    const data= await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const posts= await data.json()
    
    return posts
}

// putting posts into DOM
const putPostsIntoDom= async () => {

    const posts= await fetchPosts()

    posts.forEach((post) => {
        const postEl= document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML= `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `

        postsContainer.appendChild(postEl)
    })
}

putPostsIntoDom()

const showLoaderAndFetchMorePosts= () => {
    loader.classList.add('show')
    setTimeout(() => {  
        loader.classList.remove('show')
        setTimeout(() => {
            page++
            putPostsIntoDom()
        }, 200)
    }, 1000)
}

document.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight }= document.documentElement

    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoaderAndFetchMorePosts()
    }
})

const filterPosts= (e) => {
    const term= e.target.value

    const posts= document.querySelectorAll('.post')
    posts.forEach((post) => {
        const title= post.querySelector('.post-title').innerText
        const body= post.querySelector('.post-body').innerText

        if((title.indexOf(term) > -1) || (body.indexOf(term) > -1)) {
            post.style.display= 'flex'
        }else {
            post.style.display= 'none'
        }
    })

}

filter.addEventListener('input', (e) => {
    filterPosts(e)
})