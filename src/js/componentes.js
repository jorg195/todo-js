import { Todo } from "../classes";

import { todoList } from '../index';

//Referencias en el html
const divTodoList = document.querySelector('.todo-list');
//Ref al Input
const txtInput = document.querySelector('.new-todo');
//Ref al Borrar Completados
const btnBorrar = document.querySelector('.clear-completed');
//Ref al Filters
const ulFiltros = document.querySelector('.filters');
//Referencia a los Filtros dentro de Filters
const anchorFiltro = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {

    const htmlTodo = `<li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
    
    if(event.keyCode === 13 && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (evento) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    //click en el check
    if(nombreElemento.includes('input')) {
        
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')) { //Borrar el todo

        //Eliminar del arreglo
        todoList.eliminarTodo(todoId);

        //Eliminar del HTML
        divTodoList.removeChild(todoElemento);

    }

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //Borrar completados de abajo hacía arriba en el HTML
    for(let i = divTodoList.children.length - 1; i >= 0; i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }


});

//Evento de los filtros
ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro) return;

    //Barrer cada una de los anchorTags
    anchorFiltro.forEach(elem => elem.classList.remove('selected'));

    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){

        //Quitar clase hidden
        elemento.classList.remove('hidden'); //style.css
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }

});