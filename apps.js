// get dateTime 
var datetime = new Date();
var dd = String(datetime.getDate()).padStart(2, '0');
var mm = String(datetime.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = datetime.getFullYear();
var hrs = datetime.getHours(); // => 9
var mnt = datetime.getMinutes(); // =>  30
var scd = datetime.getSeconds();

datetime = `${mm}/${dd}/${yyyy}, ${hrs}:${mnt}:${scd}`;


var backlog = [
  {
    id: 0,
    title: 'Buat Desain Mockup',
    description: 'Tanggal 25 harus selesai oke',
    datetime: '12/17/2020, 21:26:26',
  },
  {
    id: 1,
    title: 'Front-End dashboard',
    description: 'gasken lur',
    datetime : '12/18/2020, 23:21:09',
  },
]

// drag n drop 
var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function( event ) {

}, false);

document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = "0.5";
}, false);

document.addEventListener("dragend", function( event ) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function( event ) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className == "card-body" ) {
        event.target.style.background = "";
    }

}, false);


document.addEventListener("drop", function( event ) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if ( event.target.className == "card-body" ) {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
  
}, false);
  
function renderEdit(id) {
  let edit_content = document.getElementById('edit-content')
  edit_content.innerHTML = ''
  
  for (let i = 0; i < backlog.length; i++) {
    // console.log(backlog[i].id, id);
    if (backlog[i].id === id) {
      let input = `
      <div class="card center" id="card-edit${backlog[i].id}">   
        <div class="card-body-input text-center" id="">
          <div class="card-header brd-t-primary">
            <h3 class="text-center m-0">Edit</h3>
          </div>
          <div class="card-input text-center">
            <input type="text" class="form-control" id="card-id${backlog[i].id}" placeholder="title" hidden>
            <input type="text" class="form-control-edit" id="backlog-title-edit" placeholder="" value="${backlog[i].title}">
            <input type="text" class="form-control-edit" id="backlog-description-edit" placeholder="" value="${backlog[i].description}">
            <button class="btn-add bg-success text-center" onclick="edit(${backlog[i].id})">Edit</button>
          </div>
        </div>
      </div>`
      
      edit_content.innerHTML += input
      // break
    }
  }
}

function renderBacklog() {
  let backlog_content = document.getElementById('backlog-content')
  backlog_content.innerHTML = ''
  for (let i = 0; i < backlog.length; i++) {
    let input = `
    <div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
      <div class="card-body-card" id="card${backlog[i].id}">
        <h4 class="card-title text-danger">${backlog[i].title}
          <div class="button-action">
          <button onclick="myDelete(${backlog[i].id})" class="button-trash">
          <i class="fas fa-trash-alt text-danger" title="Delete"></i>
          </button>
          <button onclick="myEdit(${backlog[i].id})" class="button-pencil">
          <i class="fas fa-pencil-alt text-success" title="Edit"></i>
          </button>
          </div>
        </h4>
        <p class="card-text">${backlog[i].description}</p>
        <p class="text-date">${backlog[i].datetime}</p>
      </div>
    </div>`
    
    backlog_content.innerHTML += input
  }
}

renderBacklog()

function edit(id) {
  console.log(id);
  let title = document.getElementById('backlog-title-edit').value
  let description = document.getElementById('backlog-description-edit').value
  let removeId = document.getElementById(`card${id}`)
  let removeCardEdit = document.getElementById(`card-edit${id}`)
  
  if (title === '') {
    alert('Title tidak boleh kosong')
  } else if (description === ''){
    alert('Description tidak boleh kosong')
  }
  
  if (title && description) {
    backlog.splice(id)
    removeId.remove()
    backlog.push({
      id : id,
      title: title,
      description: description,
      datetime : datetime
    })
    renderBacklog()
    removeCardEdit.remove();
    alert('Berhasil Edit Data')
  }
}

function add() {
  let title = document.getElementById('backlog-title').value
  let description = document.getElementById('backlog-description').value

  let id = backlog.length;
  if (title === '') {
    alert('Title tidak boleh kosong')
  } else if (description === ''){
    alert('Description tidak boleh kosong')
  }

  if (title && description) {
    backlog.push({
      id : id,
      title: title,
      description: description,
      datetime : datetime
    })
    renderBacklog()
  }
}

function myDelete(id) {
  let myobj = document.getElementById(`card${id}`);
  myobj.remove();
  backlog.splice(id)
}

function myEdit(id) {
  renderEdit(id)
}

