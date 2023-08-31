const handleCategory = async() =>{
    // category section
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick = "handleLoadVideo(${category.category_id})" class="tab bg-gray-300 rounded-md">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });

    // console.log(data.data);
};
// videos section
const handleLoadVideo = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    const videoContainer = document.getElementById('video-container');
    data.data.forEach((videos) =>{
        // console.log(videos);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class = "card bg-base-100">
        <figure>
            <img class= "h-52" src = ${videos?.thumbnail}>
        </figure>
        <div class = "card-body">
            <h2 class = "card-title">
            <div class = "avatar">
                <div class = "w-14 rounded-full">
                    <img src = ${videos?.authors[0].profile_picture}>
                </div>
            </div>
                ${videos.title}
            </h2>
            <div>
                <h5>${videos?.authors[0].profile_name}
                ${videos?.authors[0].verified}
                </h5>
                <small>${videos?.others.views}</small>
            </div>
        </div>
        </div>
        `;
        videoContainer.appendChild(div);
    })
    // console.log(data.data);
};

handleCategory();

