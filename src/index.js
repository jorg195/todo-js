import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

//instacia 
export const todoList = new TodoList();

//Carga los objetos del LocalStorage en el HTML
//todoList.todos.forEach(todo => crearTodoHtml( todo ));

//Como es el mismo argumento el que se envia se puede hacer así
todoList.todos.forEach( crearTodoHtml );

