import Dexie from 'dexie';

const db = new Dexie('phrasesDB');
db.version(1).stores({ phrases: '++id, content, lastPratice, quantityOfPratices' });

    db.on("populate", function () {
        db.phrases.add({ content: "What airline am I flying?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Where is the restroom?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "How much does the magazine cost?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "May I purchase headphones?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "How do I access the Internet?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Where can I find a restaurant?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "I have lost my passport.", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Someone stole my money.", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Where is the hospital?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Where can I find a grocery store?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "My room is messy, and I would like it cleaned.", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "I would like two double beds, please.", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "How many beds are in the room?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Do you know where this hotel is?", lastPratice: null, quantityOfPratices: 0 });
        db.phrases.add({ content: "Didn't even last a minute", lastPratice: null, quantityOfPratices: 0 });
    });

export default db;



