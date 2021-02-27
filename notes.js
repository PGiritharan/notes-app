const fs = require('fs');
const chalk = require('chalk');

const readNote = (title) => {
    const notes = loadNotes();
    const filterdNote = notes.find((note)=> note.title === title);
    if(filterdNote){
        console.log(chalk.blue.underline(filterdNote.title));
        console.log(filterdNote.body);
    }else{
        console.log(chalk.inverse.red("Note does not exist"))
    }
    
}

const addNote = (title, body)=>{
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=> note.title === title);
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'))
    }else{
        console.log(chalk.yellow.inverse('Title is already taken'))
    }
}

const saveNotes = (notes)=>{
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
}

const removeNote = (title)=>{
    const notes = loadNotes();
    const filteredData = notes.filter((note) => note.title != title );
    
    if(filteredData.length != notes.length){
        saveNotes(filteredData)
        console.log(chalk.green.inverse('Note removed successfullly'))
    }else{
        console.log(chalk.yellow.inverse('No record found for the title', title));
    }
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.inverse.blue.underline("Your Notes"));
    notes.forEach(note => {
    console.log(' -',note.title) 
    });
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};