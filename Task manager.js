const mainDiv=document.getElementById('mainDiv');
const open = document.getElementById('popup');
let uniqueId;



const deleteDataFromDatabase=(id)=>{
    fetch('https://api.freeapi.app/api/v1/todos/' +id,{
        method:'DELETE',
    })
    .then((response) =>response.json())
    .then((res)=>{
        console.log(res);
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err);
    });
};



const openUpdateForm=(id)=>{
    uniqueId=id;
    open.style.display='block';
};

const closeData=()=>{
    open.style.display='none';
};
const updateData=()=>{
    fetch('https://api.freeapi.app/api/v1/todos/' + uniqueId,{
        method:'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title:document.getElementById('title1').value,
            description:document.getElementById('description').value,


        }),
    })
        .then((response) =>response.json())
        .then((res)=>{
            console.log(res);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        });

}

const getDataFromApi =()=>{
    fetch('https://api.freeapi.app/api/v1/todos/',{
        method:'GET',
    })
    .then((response) =>response.json())
    .then((res)=>{
        if(res &&res.data&&res.data.length>0){
       res&&
       res.data&&
       res.data.map((item)=>{
        let card=document.createElement('div');
        card.setAttribute('class','card');

        let heading =document.createElement('h1');
        heading.setAttribute('class','taskh');
        heading.textContent=item.title;

        let horizontaline=document.createElement('hr');
        horizontaline.setAttribute('class','horizontaline');

        
        let heading2 =document.createElement('h1');
        heading2.setAttribute('class','desc');
        heading2.textContent="Description:";

        let paragraph=document.createElement('p');
        paragraph.setAttribute('class','paragraph');
        paragraph.textContent=item.description;

        let heading3 =document.createElement('h1');
        heading3.setAttribute('class','createOn');
        heading3.textContent="create on:";

        let paragraph2=document.createElement('p');
        paragraph2.setAttribute('class','paragraph2');
        paragraph2.textContent=item.createdAt;

        let deleteButton=document.createElement('button');
        deleteButton.setAttribute('class','deleteButton');
        deleteButton.textContent="Delete";
        deleteButton.onclick=()=>deleteDataFromDatabase(item._id);
        

        let updatebutton=document.createElement('button');
        updatebutton.setAttribute('class','updatebutton');
        updatebutton.textContent="Update";
        updatebutton.onclick=()=>openUpdateForm(item._id);



        card.appendChild(heading);
        card.appendChild(horizontaline);
        card.appendChild(heading2);
        card.appendChild(paragraph);
        card.appendChild(heading3);
        card.appendChild(paragraph2);
        card.appendChild(deleteButton);
        card.appendChild(updatebutton);
        mainDiv.appendChild(card);

       });
 
    }
})
       

    



};
   
getDataFromApi();

