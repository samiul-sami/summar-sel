const hendleloadnews = async (categoryId) => {
    const respons = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await respons.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML ="";
    const noContent =document.getElementById("no-content")
    if(data.data.length===0){
        noContent.classList.remove("hidden")
    }else{
        noContent.classList.add("hidden")
    };

    data.data.forEach((news) => {
        console.log(news.authors)
        const cardDiv = document.createElement("div"); // Use a different variable name here
        cardDiv.innerHTML = `
            <div class="card w-88 h-96 bg-base-100 shadow-xl">
            <figure><img src=${ news.thumbnail}/></figure>
                <div class="card-body">
                    <h2 class="card-title">${news.title}</h2>
                   
                   <div class="mt-4 flex justify-start items-center">
                   <div class="border max-w-full h-auto">
                   <p ><img class="rounded-full w-10 h-10" src=${news.authors[0].profile_picture}/></P>
                   </div>
                   <div>
                   <h2 class="ml-4 text-lg">${news.authors[0].profile_name}</h2>
                   </div>
                    
                </div>
                <h2">${news.authors[0].verified}</h2>

                    <p> ${news.others.views} views</p>
                    <p> ${news.others.posted_date} views</p>
            </div>
        `;
        cardContainer.appendChild(cardDiv);
    });
};

const handleCreator = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const tabcontainer = document.getElementById('tab-container');

    data.data.forEach((category) => {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `<a onclick="hendleloadnews('${category.category_id}')" class="tab">${category.category}</a>`;
        tabcontainer.appendChild(div);
    });
    
};

const noContent = async (category) => {
    const data = await (await fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`)).json();
    const noContentSection = document.getElementById("tab-container");
    noContentSection.hidden = data.data.length !== 0;
    if (data.data=== 0) { // Check if data.data has a length of 0
        noContentSection.removeAttribute("hidden");
    } else {
        noContentSection.setAttribute("hidden", true);
    }
};
    
  
noContent();










handleCreator();
hendleloadnews("1000")



