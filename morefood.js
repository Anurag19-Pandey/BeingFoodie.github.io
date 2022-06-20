
i=25
size = 30
let nextbt = document.getElementById("next")
let prevbt = document.getElementById("prev")
var loader = document.getElementById("loading")
    function foodid()
  {
    var f = ""
    var morefood = document.getElementById("morefood")
 
   
      while(i<=size)
    {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4779477fdemshb7eab257b503195p18a051jsn18020d170810',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      };
  
    fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${i}`, options)
      .then((apidata) =>{
        return apidata.json()
      }).then((data )=> {
        loader.style.display = "none";
        let mfood = `
        <div class="col-12 mt-4">
        <div class="accordion" id=${data.name}>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target=#f${data.id} aria-expanded="true" aria-controls="collapseOne">
      ${data.name}
      </button>
    </h2>
    <div id=f${data.id} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent=${data.name}>
      <div class="accordion-body">
      <div class="container">
      <div class="row">
      <div class="col-12 col-md-6 col-sm-12">
      <img id="morefoodimage" src=${data.thumbnail_url} style="width:180px;height:200px;">
      </div>
      <div class="col-12 col-md-6 col-sm-12">
      <h1 class="font-weight-bold">${data.name}</h1>
     <p>${`${data.description === null}`?`What's there in description,just click on watch and learn how to make ${data.name}`:`${data.description}`}</p>
     </div>
     </div>
     </div>
     <div class="container center">
<div class="row mt-3">
  <div class="col-3 col-md-4 col-sm-12 col-lg-4 mt-2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target=#idf${data.id}>
     Recipes
      </button>
      
      <div class="modal fade" id=idf${data.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Procedure to Create - ${data.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">       
                    ${`${data.instructions !== undefined}`?`${instruction(data.instructions)}`:`${instruction(data.instructions)}`}
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-dark text-white" data-bs-dismiss="modal">Close</button>
                      </div>
          </div>
          </div>
          </div>
        
  </div>
      <div class="col-md-4 col-sm-12 col-lg-4 mt-2">
   <a href=${data.original_video_url} target="_blank"><button class="btn btn-danger">Watch</button></a>
      </div>
      <div class="col-md-4 col-sm-12 col-lg-4 mt-2">
      <i class="fa-solid fa-arrow-up" style="color:green;"></i> ${data.user_ratings.count_positive}
      <i class="fa-solid fa-arrow-down" style="color:red;"></i> ${data.user_ratings.count_negative}
      </div>
</div>
    </div>
        
    </div>
  </div>
  </div>
  </div>
 `
        f+=mfood
        morefood.innerHTML = f 
      }).catch(err => {
        loader.style.display = "block";
      });
      i++
      nextbt.innerHTML = `<button type="button" id="nextbtn" onclick="next()" class="btn btn-info">Next<i class="fas fa-long-arrow-alt-right"></i></button>`
      prevbt.innerHTML = `<button type="button" id="prevbtn" onclick="prev()" class="btn btn-info">Prev<i class="fas fa-long-arrow-alt-right"></i></button>`
     
      pbtn = document.getElementById("prevbtn") 
      nbtn = document.getElementById("nextbtn")
  
  
  if(i<=31)
  {
     pbtn.disabled = true
     
  }
  
  if(i>65)
  {
    nbtn.disabled = true  
  
  }
    
    }    
   
}

   foodid()

  function instruction(n)
  {
    let p=``;
    for(var j=0;j<n.length;j++)
  {
     p +=  `<ul class="list-group list-group-circle mt-2">
    <li class="list-group-item list-group-item-info">${n[j].display_text}</li>
    </ul>`
}
return p;
}


function next(){

    i = i+5
    size = size+10

    setTimeout(foodid(),5000)
    
  
}

function prev(){
  
  
    i = i-10
    size = size-5

  
    setTimeout(foodid(),5000)
  }
