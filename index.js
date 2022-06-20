var img1 = document.getElementById("img1")
var img2 = document.getElementById("img2")
var img3 = document.getElementById("img3")
var img4 = document.getElementById("img4")
var img5 = document.getElementById("img5")
var loader = document.getElementById("loading")
function imag()
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4779477fdemshb7eab257b503195p18a051jsn18020d170810',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options)
        .then((apidata) => 
        {
            return apidata.json()
        }).then((data) => 
        { 
           img1.src = data.results[2].items[0].thumbnail_url
           img2.src = data.results[2].items[1].thumbnail_url
           img3.src = data.results[2].items[2].thumbnail_url
           img4.src = data.results[2].items[3].thumbnail_url
           img5.src = data.results[2].items[5].thumbnail_url

        })
        .catch(err => 
            {
                img1.src = "food1.jpg";
                img2.src = "food1.jpg";
                img3.src = "food1.jpg";
                img4.src = "food1.jpg";
                img5.src = "food1.jpg";
            });


}

imag()

function getinfo()
{
   
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4779477fdemshb7eab257b503195p18a051jsn18020d170810',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch('https://tasty.p.rapidapi.com/feeds/list?size=5&timezone=%2B0700&vegetarian=false&from=0', options)
        .then((apidata) =>
            {
                return  apidata.json()
            }).then((data) => 
           {
            let ge = ""
            card = document.getElementById("card")
            loader.style.display = "none";
            for(i=0;i<data.results.length;i++)
            {

                if(data.results[i].type === "carousel")
{
                for(j=0;j<data.results[i].items.length;j++)
                {
                    let getcard=`
                    <div class="col-md-6 col-lg-4 col-sm-12 col-12 mt-4 mr-3">
                    <div class="flip-card">
                    <div class="flip-card-inner">
                    <div class="flip-card-front">
                    <img src=${data.results[i].items[j].thumbnail_url} alt="Avatar" style="width:300px;height:300px;">
                    </div>
                    <div class="flip-card-back">
                    <h1>${data.results[i].items[j].name}</h1>    
                    <a href=${data.results[i].items[j].original_video_url} target="_blank"><button class="btn btn-danger">Watch</button></a>
                    </div>
                    </div>
                    </div>
    </div>
    `
                    
                    ge+=getcard
                    card.innerHTML = ge
            }
 
                   }
                   
               
}
          }).catch(err =>{
            loader.style.display = "block";
          });
}

 getinfo()

function instruction(n)
{
    console.log(n)
    let p=``;
    if(n!== undefined)
    {
  for(var j=0;j<n.length;j++)
{
   p +=  `<ul class="list-group list-group-circle mt-2">
  <li class="list-group-item list-group-item-info">${n[j].display_text}</li>
  </ul>`
}
}
return p;
}
