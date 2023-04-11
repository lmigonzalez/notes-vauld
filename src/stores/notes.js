
import { defineStore } from 'pinia'

export const useNotesStore = defineStore({
  id: 'notes',
  state: () => ({
    notes: []
  }),
  actions: {
    addNote: (note) => {
      useNotesStore.state.notes.push(note)
      console.log(useNotesStore.state.notes);
      
    }
  }
})


export class Note {
  constructor(noteTitle, note, date){
    this.noteTitle = noteTitle
    this.note = note
    this.date = date
  }
}
