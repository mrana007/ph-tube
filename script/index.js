const handleCategory = async() =>{
    

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
const handleLoadVideo = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    console.log(data);
};

handleCategory();

