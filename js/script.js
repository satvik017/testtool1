document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('open');
});
document.getElementById('close-menu').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.add('hidden');
    menu.classList.remove('open');
});

function previewImage(event) {
    const image = document.getElementById('image-preview');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
            image.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
    updateTemplate();
}

function removetr(id) {
    document.getElementById(id).remove();
    updateTemplate();
}


async function updateTemplate(){
    const rows = document.querySelectorAll('#biodata-table-body tr');
    let templateData = {};
    let Data={};
    let head="";
    let fileInput = document.getElementById("profile-image");
    let formData = new FormData();
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length >= 2) {
            templateData[`${inputs[0].value}`] = inputs[1].value;
        }
        if (inputs.length == 1) {
            if(head != ""){
                Data[head] = templateData;
                templateData = {};
            }
            head=inputs[0].value;
        }
    });
    if(head != ""){
        Data[head] = templateData;
        templateData = {};
    }
    if(fileInput.files && fileInput.files.length > 0){
    formData.append("profileImage", fileInput.files[0]); // Append file
    }
    formData.append("biodata", JSON.stringify(Data)); 
    try {
        // Send request to Node.js API
        const response = await fetch("http://localhost:3000/generate-image", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        // Show the generated image in preview
        if (result.image) {
            document.getElementById("biodata-preview").innerHTML="";
            for(var i in result.image){
                console.log(result.image[i]);
                let newRow = document.createElement("img");
                newRow.classList.add("border", "rounded-lg", "shadow-lg", "w-[500px]");
                
                // Ensure result.image is correctly accessed
                newRow.setAttribute("src", result.image[i]);
            document.getElementById("biodata-preview").appendChild(newRow);
            }
        }
    } catch (error) {
        console.error("Error generating biodata:", error);
    }

   
}

document.querySelectorAll('#biodata-table-body input').forEach(input => {
    input.addEventListener('change', updateTemplate);
});

// document.getElementById('add-row').addEventListener('click', function () {
//     const tableBodytr = document.getElementsByTagName('tr');
//     const tableBody = document.getElementById("biodata-table-body");
//     let cnt = tableBodytr.length;

//     const newRow = document.createElement('tr');
//     newRow.setAttribute("id", "row_" + cnt);
//     newRow.setAttribute('draggable', 'true');
//     newRow.classList.add('cursor-move');
//     newRow.innerHTML = `
// <td class="border border-gray-300 p-2 text-center cursor-move">
//     <span class="drag-handle"><svg xmlns="http://www.w3.org/2000/svg" id="mdi-drag" viewBox="0 0 24 24"><path d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" /></svg></span>
// </td>
// <td class="border border-gray-300 p-2"><input type="text" class="w-full p-1 border"></td>
// <td class="border border-gray-300 p-2"><input type="text" class="w-full p-1 border"></td>
// <td class="border border-gray-300 p-2 text-center">
//     <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="removetr('row_${cnt}');">Delete</button>
// </td>
// `;

//     tableBody.appendChild(newRow);

//     newRow.querySelectorAll('input').forEach(input => {
//         input.addEventListener('change', updateTemplate);
//     });

//     enableRowDragging(); // Re-enable drag & drop after adding new rows
// });

// document.getElementById('add-label').addEventListener('click', function () {
//     const tableBodytr = document.getElementsByTagName('tr');
//     const tableBody = document.getElementById("biodata-table-body");
//     let cnt = tableBodytr.length;

//     const newRow = document.createElement('tr');
//     newRow.setAttribute("id", "row_" + cnt);
//     newRow.setAttribute('draggable', 'true');
//     newRow.classList.add('cursor-move');
//     newRow.innerHTML = `
// <td class="border border-gray-300 p-2 text-center cursor-move">
//     <span class="drag-handle"><svg xmlns="http://www.w3.org/2000/svg" id="mdi-drag" viewBox="0 0 24 24">
//     <path d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z" /></svg></span>
// </td>
// <td colspan="2" class="border border-gray-300 p-2"><input type="text" class="w-full p-1 border"></td>
// <td class="border border-gray-300 p-2 text-center">
//     <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="removetr('row_${cnt}');">Delete</button>
// </td>
// `;

//     tableBody.appendChild(newRow);

//     newRow.querySelectorAll('input').forEach(input => {
//         input.addEventListener('input', updateTemplate);
//     });

//     enableRowDragging(); // Re-enable drag & drop after adding new rows
// });

// function enableRowDragging() {
//     const tableBody = document.getElementById('biodata-table-body');
//     let draggingRow = null;

//     tableBody.addEventListener('dragstart', function (e) {
//         draggingRow = e.target;
//         e.target.classList.add('opacity-50');
//     });

//     tableBody.addEventListener('dragover', function (e) {
//         e.preventDefault();
//         const afterElement = getDragAfterElement(tableBody, e.clientY);
//         if (afterElement == null) {
//             tableBody.appendChild(draggingRow);
//         } else {
//             tableBody.insertBefore(draggingRow, afterElement);
//         }
//     });

//     tableBody.addEventListener('dragend', function () {
//         draggingRow.classList.remove('opacity-50');
//         draggingRow = null;
//         updateTemplate();
//     });
// }

// Helper function to find the nearest row based on cursor position
// function getDragAfterElement(container, y) {
//     const rows = [...container.querySelectorAll('tr:not(.dragging)')];
//     return rows.reduce((closest, child) => {
//         const box = child.getBoundingClientRect();
//         const offset = y - box.top - box.height / 2;
//         return offset < 0 && offset > closest.offset ? { offset: offset, element: child } : closest;
//     }, { offset: Number.NEGATIVE_INFINITY }).element;
// }


document.getElementById('download-btn').addEventListener('click', function () {
    // downloadPDF();
    window.location.href = "/templates.html";
});


function downloadPDF() {
    const temprow = document.getElementById("biodata-preview");
    let biodata = {
        html: temprow.innerHTML,
    };
    // Send data to server
    fetch('/save-biodata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
               // Redirect to download
               window.location.href = "/download-pdf";
          } else {
              alert("Error saving data!");
          }
      });
}

// enableRowDragging(); 
