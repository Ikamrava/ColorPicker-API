const getColorBtn = document.getElementById("getcolor");

function getColors(){
    const mode = document.getElementById("mode")
    const sampleColor = document.getElementById("colorsample");
    const color = sampleColor.value.slice(1)
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode.value}&count=10`
    let colorArray = []

    fetch(url)
    .then(res => res.json())
    .then(function(data){
        let fullData = data.colors
        for (let i=0;i<fullData.length;i++){
            colorArray.push(fullData[i].hex.value)
        }
        document.getElementById("palletContainer").innerHTML = render(colorArray)
        const colorString = colorArray.toString()
        mode.style.background = `linear-gradient(to right,${colorString})`;
        mode.style.backgroundColor = colorArray[4]
        getColorBtn.style.background=colorArray[4]

        
    })
}
    

    getColorBtn.addEventListener("click",function(){
        getColors()
       
    
    })

    function render(list){
      let htmlTag = ""
      for (let i = 0;i<list.length;i++){
        htmlTag += `
        <div id="${list[i]}" class="palletdiv" style="background-color:${list[i]}" >
        <span id="${list[i]}">${list[i]}</span>
      </div>
      ` 
      }
       
      
        return htmlTag

    }

    document.getElementById("palletContainer").addEventListener("click", function(e){
      const snakBar = document.getElementById("snackbar");
      navigator.clipboard.writeText(e.target.id);
      snakBar.textContent = `${e.target.id} Copied`
      snakBar.className = "show";
      setTimeout(function () {
        snakBar.className = snakBar.className.replace("show", "");
      }, 3000);
     
    })



  



    getColors()

    
    


    