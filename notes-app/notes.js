const { default: chalk } = require('chalk')
const fs = require('fs');

const addNote =(title, body)=>{
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title ===title )


    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    }else{
        console.log(chalk.bgRed('Note title taken! '));
    }
     
}

const removeNote =(title)=>{
   const notes = loadNotes();
   const newNotes =notes.filter(function(note){
        return note.title !== title
         });
        if(notes.length > newNotes.length){
            console.log(chalk.bgGreen('Note removed'));
        }else{
            console.log(chalk.bgRed('No note found'));
        }
      saveNotes(newNotes);
   }


const listNotes =()=>{
        const notes = loadNotes();
        console.log(chalk.bgYellow('Your notes'));
        
        notes.forEach((note)=>{
            console.log(note.title);
        })      
}

const readNote = function(title){
     const notes = loadNotes();
     const noteFound = notes.find((note)=>note.title === title);
     if(noteFound !== undefined){
        console.log(chalk.inverse(noteFound.title));
        console.log(noteFound.body);
     }else{
        console.log(chalk.bgRed("Error"));
     }
}

const saveNotes =(notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
   }

const loadNotes =()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return[]
    }   
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}