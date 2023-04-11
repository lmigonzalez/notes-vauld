<script>
import NoteCard from './components/Note/NoteCard.vue';
import NoteForm from './components/NoteForm/NoteForm.vue'
import EditNoteForm from './components/EditNoteForm/EditNoteForm.vue';
import SearchBar from './components/SearchBar/SearchBar.vue'
export default {

  components: {
    NoteCard,
    NoteForm,
    EditNoteForm,
    SearchBar
  },
  mounted() {
    // console.log()
    if (localStorage.getItem('notes')) {
      // console.log(localStorage.getItem('notes'));
      this.notes = JSON.parse(localStorage.getItem('notes'))
    }
  },
  data() {
    return {
      showAddNote: false,
      showEditForm: false,
      notes: [
        {
          id: '1',
          noteTitle: 'Patient History',
          note: "Patient reports experiencing chest pain, shortness of breath, and dizziness. No prior history of heart disease or related conditions.",
          date: 'Abril 21, 2021'

        },
        {
          id: '2',
          noteTitle: 'Medication List',
          note: "Patient is currently taking metformin for type 2 diabetes, lisinopril for hypertension, and atorvastatin for high cholesterol. No known drug allergies.",
          date: 'Abril 11, 2020'
        },
        {
          id: '2',
          noteTitle: 'Progress Note',
          note: "Patient presents with a persistent cough and fever. Lungs auscultate with bilateral crackles. Chest X-ray shows bilateral pneumonia. Plan includes starting antibiotics and monitoring oxygen saturation.",
          date: 'November 30, 2021'
        },
      ],
      noteToEdit: {},
      filterNotes: []
    }
  },
  methods: {
    setLocalStorage() {
      const notesArray = JSON.stringify(this.notes)

      if (localStorage.getItem('notes')) {
        localStorage.removeItem('notes')
      }

      localStorage.setItem('notes', notesArray)

    },
    addNote() {
      this.showAddNote = !this.showAddNote
      this.showEditForm = false

    },
    createNote(note) {
      note.id = new Date()
      this.notes = [...this.notes, note]
      this.setLocalStorage()
    },
    deleteNote(id) {
      this.notes = this.notes.filter((note) => note.noteTitle !== id)
      this.setLocalStorage()
    },
    editNote(newNote) {

      this.showEditForm = !this.showEditForm
      this.noteToEdit.id = newNote.id
      this.noteToEdit.noteTitle = newNote.noteTitle
      this.noteToEdit.note = newNote.note

      const index = this.notes.findIndex(note => note.noteTitle === newNote.noteTitle)

      this.notes[index].note = this.noteToEdit.note

      this.setLocalStorage()

    },
    closeForm() {
      this.showEditForm = !this.showEditForm
      this.showAddNote = false
    },
    filterArray(text) {

      let filterNotesArray = []

      this.notes.map((note) => {
        let newQuery = text.split(' ').join('')
        let currentNote = note.noteTitle.split(' ').join('')

        if (currentNote.toLowerCase().trim().includes(newQuery.toLowerCase().trim())) {
          filterNotesArray.push(note)
        }
        if (text.length === 0) {
          filterNotesArray = []

        }
      })


      this.filterNotes = filterNotesArray

    }

  }
}


</script>

<template>
  <header>
    <h1>NotesVault</h1>
    <p>You current have <span>{{ notes.length }}</span> {{ notes.length > 1 || notes.length === 0 ? 'notes' : 'note' }}
    </p>

  </header>
  <div class="main-div">

    <SearchBar :notes="notes" :filterArray="filterArray" />
    <main>
      <div class="notes">
        <p class="empty-notes" v-if="notes.length === 0">You don't have any notes yet</p>
        <NoteCard v-if="filterNotes.length === 0" v-for="note in notes" key="note.title" :noteTitle="note.noteTitle"
          :note="note.note" :date="note.date" :deleteNote="deleteNote" :editNote="editNote" />

        <NoteCard v-if="filterNotes.length > 0" v-for="note in filterNotes" key="note.title" :noteTitle="note.noteTitle"
          :note="note.note" :date="note.date" :deleteNote="deleteNote" :editNote="editNote" />
      </div>

    </main>

    <NoteForm :notes="notes" @create-note="createNote" :addNote="addNote" v-if="showAddNote" />

    <EditNoteForm v-if="showEditForm" :closeForm="closeForm" :noteToEdit="noteToEdit" :editNote="editNote"
      :notes="notes" />
    <button @click="addNote" class="add-btn">
      <img src="../public/add.png" alt="add icon">
    </button>

  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* addNote="$emit('add-note', newNote) */

span {
  color: #DF2E38;
  font-weight: 600;
}


.empty-notes {
  font-size: 2rem;
  text-align: center;
}

.main-div {
  min-height: 100vh;
  margin-bottom: -5rem;
  position: relative;
}

main {
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;

}

.add-btn {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.add-btn img {
  height: 3rem;
  width: 3rem;
}



img {
	width: 25px;
	margin: 0 0.3rem;
	transition: 0.2s ease-in-out;
}
img:hover{
	scale: 1.1;
}
</style>
