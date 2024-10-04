// Categories Data Fetch
const fetchCategoriesData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => showData(data.categories))
    .catch((error) => console.log(error));
};

// Data show

// {
// category: "Music"
// category_id: "1001"
// }

const showData = (categoryData) => {
  // console.log(categoryData)

  const categoryContainer = document.getElementById("categories");
  categoryData.forEach((item) => {
    const buttonContainer = document.createElement("div");
    
    buttonContainer.innerHTML=     //BUTTON CLICK FOR CATEGORY VIDEOS
    `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})"  class="btn btn-category">${item.category}</button>
    `
    
    categoryContainer.append(buttonContainer);
  });
};



// Remove button background class
const removeActiveClass=()=>{
  
    const buttons= document.getElementsByClassName("btn-category")
    for(let button of buttons){
        button.classList.remove('active');
    }
}



const loadCategoryVideos = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

        removeActiveClass();

        activeBtn=document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        showVideoData(data.category)
    })
    .catch(err => console.log(err))
} 




const fetchVideosData = (searchValue = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`)
    .then((response) => response.json())
    .then((data) => showVideoData(data.videos))
    .catch((error) => console.log(error));
};




//JUST TO SHOW OBJECT EXAMPLE OF VIDEO ITEM. THIS HAS NOTHING CONNECTION WITH THE CODE

// const videoItem =  
//     {    
//       "category_id": "1001",
//       "video_id": "aaaa",
//       "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//       "title": "Shape of You",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//         }
//       ],
//       "others": {
//         "views": "100K",
//         "posted_date": "16278"
//       },
//     }

// END OF THIS EXAMPLE


// Time Set Function

const setTime = (time)  => {

    const hours=parseInt(time / 3600);
    const remainingTime= parseInt(time % 3600);
    const minutes= parseInt(remainingTime/60);
    const seconds=parseInt(remainingTime%60);

    return `${hours} hours ${minutes} minutes ${seconds} seconds left`

}

const showVideoData = (video) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML="";

  if(video.length == 0){

    videoContainer.classList.remove("grid")
    videoContainer.innerHTML= 
    `
    <div class="min-h-[300px] flex flex-col items-center justify-center gap-y-5" >
    
    <img class="" src="assets/Icon.png" />
    <h2 class="font-bold text-3xl">NO Content available here! </h2> 
    
    </div>
    `
    return;
  }else{
    videoContainer.classList.add("grid");
  }

  video.forEach((vItem) => {
    // console.log(vItem);

    const card = document.createElement("div");
    card.classList=" card card-compact "
    card.innerHTML = `
    <figure class="h-[200px] relative">
    
        <img src= ${vItem.thumbnail} class="h-full w-full object-cover" / >

       ${vItem.others.posted_date.length == 0 ? "" : ` <span class= "absolute right-2 bottom-2 bg-black text-white p-1 rounded text-xs"> ${setTime(vItem.others.posted_date)}</span>`}

    </figure>
  <div class="px-0 py-3 flex gap-3">
    <div>
      <img class="h-10 w-10 rounded-full object-cover" src=${vItem.authors[0].profile_picture} />
    </div>

    <div class="">
     <h2 class="font-bold"> ${vItem.title} </h2>
     <div class="flex items-center gap-2"> 
        
        <p class="text-gray-400"> ${vItem.authors[0].profile_name}</P>
        
        ${vItem.authors[0].verified===true ? `<img  src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5" /> `: ""}

     </div>
     <p> </P>
    </div>
  </div>
        `;

        videoContainer.append(card);
  });
};


document.getElementById('search-btn').addEventListener("keyup", (e)=>{
    fetchVideosData(e.target.value);
})

fetchCategoriesData();

fetchVideosData();
