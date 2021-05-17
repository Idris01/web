document.addEventListener("DOMContentLoaded", () =>{
  
  loadNames([94,10]);
});

var getData= async (num)=>{
  var data = await fetch(`info/${num[0]}/${num[1]}`);
    return data.json();
}

function loadNames(num){
  getData(num).then(response => {
  // call the loadPages function with page index as undefined the first time its called
  loadPages(response); 
  });
}


// the loadPages function is called to 
 // take care of pagination
function loadPages(page_data){
   
    if(page_data.length < 2){
      // we only have one page so hide the paginator
      document.getElementById("paginator").style.display="none";
      
      show_page(page_data[0]);
    }
    else{   // multiple pages making use of page_index
    
        window.onpopstate =function(event){
        show_page(page_data[event.state.page]);
      }
  
    // make sure the paginator is visible
    document.getElementById("paginator").style.display="block";
    // get the previous button
    let previous=document.getElementById("previous");
    
    // get the next button
    let next=document.getElementById("next");
    
      if(previous.dataset.page==0 && next.dataset.page==0){
        // at this point the page is loaded for the first time 
        // show the first page
        show_page(page_data[0]);
        
        //disable previous button initially 
        previous.disabled=true;
        
        //now set the values of the buttons
        previous.dataset.page=0;
        next.dataset.page=1;
        document.getElementById("page_label").innerHTML=`page 1 of ${page_data.length}`;
      }
      
      // add EventListener to the previous button
      previous.onclick=function(){
        
          let m=parseInt(this.dataset.page)-1;
          if(m==0){ // clicking shows last page 
            
            // disable the button
            previous.disabled=true;
            next.disabled=false;
            this.dataset.page =parseInt(this.dataset.page)-1;
            next.dataset.page=parseInt(next.dataset.page)-1;
          }
          else{
            this.dataset.page =parseInt(this.dataset.page)-1;
            next.dataset.page=parseInt(next.dataset.page)-1;
            next.disabled=false;
            this.disabled=false;
          }
          let page=parseInt(this.dataset.page) + 1;
                  history.pushState({page:page},"", `page${page}`);
          show_page(page_data[this.dataset.page]);
          
          // set the page number display
          document.getElementById("page_label").innerHTML=`page ${parseInt(this.dataset.page)+1} of ${page_data.length}`;
      }
      
      // add EventListener to the next button
      next.onclick=function(){
       
          
        show_page(page_data[next.dataset.page]);
        
        let n=parseInt(this.dataset.page) +1;
        history.pushState({page:n},"", `page${n}`); 
          if(n == (parseInt(page_data.length) )){ // moving to the last page
            
            // disable the next button
            this.disabled=true;
            
            // enable the previous button
            previous.disabled=false;
            
            // update the dataset 
            this.dataset.page =parseInt(this.dataset.page)+1;
            previous.dataset.page=parseInt(previous.dataset.page)+1;
          }
          else if(n < page_data.length){
            this.dataset.page =parseInt(this.dataset.page)+1;
            previous.dataset.page=parseInt(previous.dataset.page)+1;
            previous.disabled=false;
            
          }
          
          document.getElementById("page_label").innerHTML=`page ${this.dataset.page} of ${page_data.length}`
      }
    }
  } 


// called to display the requested page as required
function show_page(page){
    var body=document.getElementById("main");
    body.innerHTML="";
    //body.style.color="brown";
    page.forEach(person =>{
        let p=document.createElement('div');
        p.setAttribute('id','name_view');
        p.innerHTML=`<span class="sn">${person.id}</span><strong>${person.firstname} ${person.lastname}, ${person.age}</strong>`;
      body.appendChild(p);
    });
}