const form =document.querySelector('#todo-form');
const todolist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-todo');
const filter=document.querySelector('#filter');
const todoinput =document.querySelector('#todo');
loadEventListners();
function loadEventListners(){
    document.addEventListener('DOMContentLoaded',gettodo);
    form.addEventListener('submit',addtodo);
    todolist.addEventListener('click',removetodo);
    clearBtn.addEventListener('click',cleartodo);
    filter.addEventListener('keyup',filtertodo);
    function gettodo(){
        let todos;
        if(localStorage.getItem('todos')=== null){
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
            const li=document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(todo));
    
            const link= document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML='<i class="fa fa-remove"></i>';
            li.appendChild(link);
            todolist.appendChild(li);
       
        }); 
    }
    function addtodo(e){
        if(todoinput.value===''){
            alert('Add a To-Do item');
        }
        const li=document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(todoinput.value));

        const link= document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        todolist.appendChild(li);
        storetodoInLocalStorage(todoinput.value);
        todoinput.value='';

        e.preventDefault();
    }
    function storetodoInLocalStorage(todo){
        let todos;
        if(localStorage.getItem('todos')=== null){
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));
    }
    function removetodo(e){
        if (e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are you sure?')){
              e.target.parentElement.parentElement.remove();
              removetodoFromLocalStorage(e.target.parentElement.parentElement);
            }
        }
    }
    function removetodoFromLocalStorage(todoItem){
        let todos;
        if(localStorage.getItem('todos')=== null){
            todos=[];
        }else{
            todos=JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo, index){
            if(todoItem.textContent === todo){
                todos.splice(index,1);
            }
        });
        localStorage.setItem('todos',JSON.stringify(todos));
    }
    
    function cleartodo(){
        while(todolist.firstChild){
            todolist.removeChild(todolist.firstChild);
        }
        cleartodoFromLocalStorage();
    }
    function cleartodoFromLocalStorage(){
        localStorage.clear();
    }
    
    function filtertodo(e){
        const text=e.target.value.toLowerCase();
        document.querySelectorAll('.collection-item').forEach(
           function(todo){
               const item= todo.firstChild.textContent;
               if(item.toLowerCase().indexOf(text) != -1){
                   todo.style.display='block';
               }else{
                   todo.style.display='none';
               }
           });
    }
      
}