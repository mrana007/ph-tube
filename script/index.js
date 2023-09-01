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
    // const sort = document.getElementById('sort-view')
    // data.sort((a, b)=>perseInt(b.others.views)-perseInt(a.others.views))
    // console.log(data.data);
};
// videos section
const handleLoadVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const videoContainer = document.getElementById('video-container');
    videoContainer.textContent = '';
    const drawingVideos = document.getElementById('drawing-videos')
    if(data.data.length === 0){
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
            <span class = "absolute right-6 bottom-1 bg-black text-white">
            ${(videos?.others?.posted_date)?timeDuration(videos?.others?.posted_date):''}</span>
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
                <h3 class = "flex items-center gap-1">
                <div>${videos?.authors[0].profile_name}</div>
                ${videos?.authors[0].verified?
                `<img src="images/verified.png" alt="">`: ''}
                </h3>
                <small>${videos?.others.views}</small>
            </div>
        </div>
        </div>
        `;
        videoContainer.appendChild(div);
    });
    // console.log(data.data);
};
const timeDuration = sec =>{
    var sec = parseInt(sec);
    var hours = Math.floor(sec/3600);
    var mins = Math.floor((sec % 3600) /60);
    return `<div>${hours} hrs ${mins} min ago</div>`
}
// function timeDuration(sec){
//     let hrs = Math.floor(sec/3600);
//     let mins = Math.floor((sec % 3600) /60);
//     return `<div>${hrs} hrs ${mins} min ago</div>`
// }
handleCategory();
handleLoadVideos(1000);

// ${(videos?.others?.posted_date)?showTime(videos?.others?.posted_date):''}
// ${showTime(videos?.others.posted_date)}