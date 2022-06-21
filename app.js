//get elements
const skills = document.querySelector('#skill_list');
//element for part-2
const devs_add_form = document.getElementById('devs_add_form');
//element for part-4
const devs_data_list = document.querySelector('#devs_data_list');
//lP-3
const devs_edit_form = document.querySelector('#devs_edit_form');



// console.log(skills);

//part-1 load all skills from api

const loadSkills = ()=>{

    axios.get('http://localhost:5051/skill').then(skill =>{

        let skill_list = '';
        skill.data.map(skill =>{
            skill_list +=`
            <option value="${skill.id}">${skill.name}</option>
            `;
        });
        skills.insertAdjacentHTML('beforeend', skill_list);//this line solves the problem
       
    });
}

loadSkills()
/**
 * part-3 & 4 --All devs load
 */
const getDevelopers = () =>{
    axios.get('http://localhost:5051/developers').then(res =>{
        let dev_data = '';
        res.data.map((dev,index)=>{
            dev_data += `
            <tr>
                <td>${index + 1}</td>
                <td>${dev.name}</td>
                <td>${dev.email}</td>
             
                <td><img style= "object-fit:cover; width:50px; height:50px;"src="${dev.photo}" alt=""></td>
                <td>
                    <a data-bs-toggle="modal" class="btn btn-info btn-sm" href="#modal_view"><i class="fa fa-eye"></i></a>
                    <a data-bs-toggle="modal" class="btn btn-warning btn-sm" onclick="editDeveloper(${dev.id})"  href="#modal_edit"><i class="fa fa-edit"></i></a>
                    <a data-bs-toggle="modal" class="btn btn-danger btn-sm" href="#modal_delete"><i class="fa fa-trash"></i></a> 
                </td>
            </tr>
            `;
        });
        devs_data_list.innerHTML = dev_data;

    });
}
getDevelopers();

/**
 * part-2 Add new devs
 */

 devs_add_form.addEventListener('submit',function(e){

    e.preventDefault();

    // let name = document.querySelector('#name');
    // let name = devs_add_form.querySelector('#name');
    //aikhane  document.getElementById dile kaaj korbe na, because add event listener er vitore

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill_list');
    
    if(name.value == '' || email.value == '' || photo.value == ''){
        alert("All fields are required");
    }
    else{
        axios.post('http://localhost:5051/developers', {
            id: "",
            name: name.value,
            email:email.value,
            photo:photo.value,
            skillId: skill.value

        }).then(res =>{
            //making the placeholders empty after clicking add button
            name.value ='';
            email.value ='';
            photo.value ='';
            skill.value ='';

            //add new button a click korle instant jaate kaaj kore tai nicher function ta eventlistener er vitore add korsi
            getDevelopers();
        });       
    
    };
 });

 /**
  * step-9 Developers Data Edit
  */

 function editDeveloper(id){

    //alert(id);

    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let photo = document.getElementById('ephoto');
    let skill= document.getElementById('eskill_list');

    let preview = document.getElementById('epreview');

    // lastpart- ediding existing data
    let edit_id = document.getElementById('edit_id');


    axios.get(`http://localhost:5051/developers/${id}`).then(res =>{

        name.value = res.data.name;
        email.value = res.data.email;
        photo.value = res.data.photo;
        skill.value = res.data.skillId;

         // lastpart- editing existing data
        edit_id.value = id;

        preview.setAttribute('src', res.photo);

    });
 };

 //LP-4

 devs_edit_form.addEventListener('submit',function(e){

    e.preventDefault();

    let name = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let photo = this.querySelector('#ephoto');
    let skill = this.querySelector('#eskill_list');
    let edit_id = this.querySelector('#edit_id');


    axios.patch(`http://localhost:5051/developers/${edit_id.value}`,{

        id: "",
        name: name.value,
        email:email.value,
        photo:photo.value,
        skillId: skill.value

    }).then(res => {

        name.value ='';
        email.value ='';
        photo.value ='';
        skill.value ='';

        getDevelopers();
    });
 })