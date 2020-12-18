// get dateTime 
var datetime = new Date();
var dd = String(datetime.getDate()).padStart(2, '0');
var mm = String(datetime.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = datetime.getFullYear();
var hrs = datetime.getHours(); // => 9
var mnt = datetime.getMinutes(); // =>  30
var scd = datetime.getSeconds();

datetime = `${mm}/${dd}/${yyyy}, ${hrs}:${mnt}:${scd}`;


var arrCategory = [
  {
    id: 0,
    category: 'Front-End dashboard',
    valColor: 'brd-t-warning'
  }
]

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
  
function renderBacklog() {
  let backlog_content = document.getElementById('backlog-content')
  backlog_content.innerHTML = ''
  
  for (let i = 0; i < backlog.length; i++) {
    let input = `
    <div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)">
      <div class="card-body-card" id="card${backlog[i].id}">
        <h4 class="card-title text-danger">${backlog[i].title}
          <button onclick="myDelete(${backlog[i].id})" class="button-trash">
            <i class="fas fa-trash-alt text-danger" title="Delete"></i>
          </button>
        </h4>
        <p class="card-text">${backlog[i].description}</p>
        <p class="text-date">${backlog[i].datetime}</p>
      </div>
    </div>`
    
    backlog_content.innerHTML += input
  }
}

renderBacklog()

function add() {
  let title = document.getElementById('backlog-title').value
  let description = document.getElementById('backlog-description').value
  // alert(valColor)

  let id = backlog.length;
  if (title === '') {
    alert('title tidak boleh kosong')
  } else if (description === ''){
    alert('description tidak boleh kosong')
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
  var myobj = document.getElementById(`card${id}`);
  myobj.remove();
  backlog.splice(id)
}

// function renderCategory() {
//   let category_content = document.getElementById('category-content')
//   category_content.innerHTML = ''
  
//   for (let i = 0; i < arrCategory.length; i++) {
//     let input = `
//     <div class="card-body" id="myCategory${arrCategory[i].id}">
//       <div class="card-header brd-t-info">
//         <h3 class="text-center m-0">${arrCategory[i].category}</h3>
//       </div>
//     </div>`
    
//     category_content.innerHTML += input
//   }
// }

// renderCategory()

// function addCategory() {
//   let category = document.getElementById('category').value
//   let idxColor = document.getElementById('select-input-color').selectedIndex
//   let valColor = document.getElementsByTagName("option")[idxColor].value
//   // alert(valColor)
//   let id = arrCategory.length;
//   if (category === '') {
//     alert('category tidak boleh kosong')
//   } else if (valColor === '') {
//     alert('pilih label warna')
//   }

//   if (category && valColor) {
//     arrCategory.push({
//       id : id,
//       category: category,
//       valColor : valColor
//     })
//     renderCategory()
//   }
// }
