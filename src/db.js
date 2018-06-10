import Dexie from 'dexie';

// const db = new Dexie('u_speaking_db');
// db.version(1).stores({ phrases: '++id,content,lastPratice,quantityOfPratices' });

const db = new Dexie('ReactSampleDB');
db.version(1).stores({ todos: '++id, title, done' });

db.on("populate", function() {
    db.todos.add({
        title: 'ok',
        done: false,
      });
});

export default db;



