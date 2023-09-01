const handleCategory = async() =>{
    // category section
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick = "handleLoadVideos(${category.category_id})" class="tab font-medium bg-gray-300 rounded-md">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
    // console.log(data.data);
};
// videos section
const handleLoadVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const videoContainer = document.getElementById('video-container');
    videoContainer.textContent = '';
    const drawingVideos = document.getElementById('drawing-videos')
    if(data.data.length ===0){
        drawingVideos.classList.remove('hidden')
    }
    else{
        drawingVideos.classList.add('hidden')
    }
    data.data.forEach((videos) =>{
        // console.log(videos);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class = "card bg-base-100">
        <figure class ="relative">
            <img class= "h-52" src = ${videos?.thumbnail}>
            <span class = "absolute right-11 bottom-2 bg-black text-white">${videos?.others.posted_date}</span>
        </figure>
        <div class = "card-body">
            <h2 class = "card-title">
            <div class = "avatar">
                <div class = "w-14 rounded-full">
                    <img src = ${videos?.authors[0].profile_picture}>
                </div>
            </div>
                <p>${videos.title}</p>
            </h2>
            <div>
                <h5 class = "flex items-center gap-1">
                <div>${videos?.authors[0].profile_name}</div>
                ${videos?.authors[0].verified?
                `<img src="images/verified.png" alt="">`: ''}
                </h5>
                <small>${videos?.others.views}</small>
            </div>
        </div>
        </div>
        `;
        videoContainer.appendChild(div);
    });
    // console.log(data.data);
};

handleCategory();
handleLoadVideos(1000);

