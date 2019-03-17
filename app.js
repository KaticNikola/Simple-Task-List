//define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listener
loadEventListeners()

function loadEventListeners() {
	//DOM load event > cim se loaduje povlaci iz local storage data
	document.addEventListener('DOMContentLoaded', getTasks)
	//create new task event
	form.addEventListener('submit', addTask);
	//remove task from list
	taskList.addEventListener('click', removeTask);
	// clear all tasks
	clearBtn.addEventListener('click', clearTasks );
	//filter kroz taskove
	filter.addEventListener('keyup', filterTasks);
}

//functions
//get task from local storage
function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	//loop kroz taskove iz LS
	tasks.forEach(function(task){
		//napravis DOM element koji pokazes u DOM
		const li =document.createElement("li");
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));
		const link = document.createElement('a');
		link.className = "delete-item secondary-content";
		link.innerHTML = "<i class='fa fa-remove'></i>";
		li.appendChild(link);
		taskList.appendChild(li);
	})
}

//add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('add a task');
	} 
	//napravi li element
	const li =document.createElement("li");
	li.className = 'collection-item';
	//text node > input text postaje sadrzaj taska
	li.appendChild(document.createTextNode(taskInput.value));
	// new link >delete x
	const link = document.createElement('a');
	link.className = "delete-item secondary-content";
	//icon 
	link.innerHTML = "<i class='fa fa-remove'></i>";
	//dodaj lnk u ul
	li.appendChild(link);

	//append li to ul
	taskList.appendChild(li);

	//fn koja store items to local storage
	storeTasksInLocalStorage(taskInput.value);

	//clear input 
	taskInput.value = '';


	e.preventDefault();
}

//to local storage 
function storeTasksInLocalStorage(task){
	let tasks;
	//proveravas da li vec psotji taj task u local storage
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	//u arr sa taskovima(local storage) dodamo task koji smo dodali u DOM
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task fromlist
function removeTask(e){
	// gde kliknemo(i).parent element(a).sadrzi klasu
	if (e.target.parentElement.classList.contains("delete-item")) {
		if (confirm('Are you Sure?')) {
			//remove element li
			e.target.parentElement.parentElement.remove();
			//remove from local storage  
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//clear all tasks
function clearTasks() {
	// //obrise ceo sadrzaj ul
	// taskList.innerHTML = '';
	//loop i remove 1 b 1
	//dokle god taskliks ima 1st chile 1 item
	while (taskList.firstChild) {
		// ul remove child 1stchild
		taskList.removeChild(taskList.firstChild)
	}

	//clear from LS
	clearTasksFromLocalStorage();
}

//filter taskova
function filterTasks(e) {
	//ukucani txt
	const txt = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task) {
			//item = sadrzaj taska
			const item = task.firstChild.textContent;
			//sadrzaj taska = ukucani text nije -1 >sadrzi text
			if (item.toLowerCase().indexOf(txt) !== -1) {
				task.style.display = 'block';
			} else {
				task.style.display = 'none';
			}
	});
}

//remove from local storage
function removeTaskFromLocalStorage(taskItem){
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task, index){
		//sadrzaj taska na koji smo kliknuli === sadzaj taksa iz LS
		if(taskItem.textContent === task){
			tasks.splice(index, 1)
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
	
}
//clear tasks form LS

function clearTasksFromLocalStorage(){
	localStorage.clear();
}