

var size = 10
var latest = 0
var add = 10

var time = 30;
var loader = document.getElementById("loading")

function displayRadioValue() {
  
  var check = document.getElementsByName("time")
  
  for(i = 0; i < check.length; i++) {
    if(check[i].checked)
      time = check[i].value
    }
    food()
}

  function food(){
  var w = document.getElementById("ex");
  let next = document.getElementById("next")
  let prev = document.getElementById("prev")
  let m = "";
  let p = "";
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4779477fdemshb7eab257b503195p18a051jsn18020d170810',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  fetch(`https://tasty.p.rapidapi.com/recipes/list?from=${latest}&size=${size}&tags=under_${time}_minutes`, options).then((response) => 
  response.json()
  ).then((data )=>{
    let rec = "";
    loader.style.display = "none";

    for(var i=latest;i<size;i++)
    {
      var n = data.results[i].instructions;
      if(n === undefined)
      {
        n = [{
          display_text : "Sorry No Instructions Available"
        }]
      }
      let food = `
      <div class="col-md-6 col-sm-12 col-lg-4 col-12 mb-3 d-flex align-items-stretch">
      <div class="card">
      <img src=${data.results[i].thumbnail_url} class="card-img-top" id="receipe_photo" alt="...">
      <div class="card-body">
      <h5 class="card-title font-weight-bold" id="title">${data.results[i].name}</h5>
      <p class="card-text" id="desc">${data.results[i].description}</p>
      <i class="fa-solid fa-clock"></i><span id="timer"> ${data.results[i].total_time_minutes} min</span>
      <i class="fa-solid fa-arrow-up"></i><span id="high"> ${data.results[i].user_ratings.count_positive} </span>
      <i class="fa-solid fa-arrow-down"></i><span id="low"> ${data.results[i].user_ratings.count_negative} </span>
      <br>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=#id${data.results[i].id}>
      Recipes !
      </button>
      
      <div class="modal fade" id=id${data.results[i].id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Procedure to Create - ${data.results[i].name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">       
                    ${`${n !== undefined}`?`${instruction(n)}`:`${instruction(n)}`}
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-dark text-white" data-bs-dismiss="modal">Close</button>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
          </div>
          </div>
          `
          rec+=food;
          w.innerHTML  = rec;
          
        }
        
        let mo = `<button type="button" id="nextbtn" onclick="next()" class="btn btn-info">Next<i class="fas fa-long-arrow-alt-right"></i></button>`
        m+=mo
        next.innerHTML = m;
        let po = `<button type="button" id="prevbtn" onclick="prev()" class="btn btn-info">Prev<i class="fas fa-long-arrow-alt-right"></i></button>`
        p+=po
        prev.innerHTML = p;

        var btnn = document.getElementById("nextbtn")
        if(size >= 40)
        { 
         btnn.disabled = true
        }
        var btnp = document.getElementById("prevbtn")
        if(latest < 10)
    {
      btnp.disabled = true
    }
        
      }).catch(err => console.error(err));
    }
    
     food()

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

  function next()
  {
    var btnn = document.getElementById("nextbtn")
     latest = size+1
     size = size+add
    if(size >= 40)
    {
      btnn.disabled = true
    }
      food();
  }

 
  function prev()
  {
  
     latest -= 10
     size = size-add
     food();
  }