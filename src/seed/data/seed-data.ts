
interface SeedTask {
    title: string;
    description: string;
    isDone: boolean;
}


interface SeedData {
    tasks: SeedTask[];
}

export const initialData: SeedData = {
    tasks: [
        { title: "Hacer la cama", description: "Arreglar las sábanas y almohadas", isDone: false },
        { title: "Lavar los platos", description: "Limpiar los platos sucios después de comer", isDone: false },
        { title: "Hacer ejercicio", description: "Realizar una rutina de ejercicio físico", isDone: false },
        { title: "Ir de compras", description: "Comprar alimentos y otros artículos necesarios", isDone: false },
        { title: "Cocinar la cena", description: "Preparar la comida para la cena", isDone: false },
        { title: "Limpiar el baño", description: "Limpiar el lavamanos, inodoro y ducha", isDone: false },
        { title: "Pasear al perro", description: "Sacar al perro a dar un paseo", isDone: false },
        { title: "Leer un libro", description: "Dedicar tiempo a la lectura", isDone: false },
        { title: "Llamar a un amigo", description: "Hacer una llamada para mantener el contacto", isDone: false },
        { title: "Organizar el escritorio", description: "Ordenar los documentos y objetos en el escritorio", isDone: false }
      ]
}