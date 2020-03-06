import { Todo } from "./todo.class";


export class TodoList{

    constructor() {

        //this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    //TODO
    eliminarTodo(id){

        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();

    }

    //TODO
    marcarCompletado(id){

        for(const todo of this.todos){

            if(todo.id == id){

                todo.completado = !todo.completado;
                break;

            }

        }

        this.guardarLocalStorage();

    }

    //TODO
    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado  );
        this.guardarLocalStorage();
    }

    //Método para guardar los todos en el localstorage
    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos));
        
    }

    //Método para cargar los todos guardados en el localstorage
    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
                        //Convierte el string del JSON al objeto original para que se pueda cargar
                        ? JSON.parse(localStorage.getItem('todo')) 
                        //No lo carga porque no hay nada guardado
                        : [];

        //Se convierten a instancias de TODO
        this.todos = this.todos.map( Todo.fromJson );

    }
}