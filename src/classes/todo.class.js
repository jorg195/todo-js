export class Todo{

    //Recibir objeto
    static fromJson(id,tarea,completado,creado){

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = id;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea){

        this.tarea = tarea;

        this.id = new Date().getTime(); //Hora actual (ID)
        this.completado = false; //Tarea completada
        this.creado = new Date(); 
    }

    imprimirClase() {
        console.log(`${this.tarea} = ${this.id}`);
    }

}