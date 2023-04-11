<script>
// import { storeToRefs} from 'pinia'
// import { useNotesStore, Note } from '../../stores/notes'
// const main = useNotesStore()
// const {addNote} = storeToRefs(main)
export default {

	name: 'NoteForm',
	data() {
		return {
			noteTitle: '',
			note: ''

		}
	},
	props: {
		addNote: {
			type: Function
		},
		notes: Array

	},

	methods: {
		cancelNote() {
			this.addNote()

		},
		handleSubmit() {
			const titleExists = this.notes.some(note => note.noteTitle === this.noteTitle)

			if (titleExists) {
				alert('This title already exists');
				return;
			}

			if (this.noteTitle.trim() === '') {
				alert('Title is required');
				return;
			} else if (this.noteTitle.length > 25) {
				alert('Title must be less than 20 characters');
				return;
			} else if (this.note.trim() === '') {
				alert('Note is required');
				return;
			}
			const newNote = {
				id: new Date(),
				noteTitle: this.noteTitle,
				note: this.note,
				date: this.formatDate()
			}

			this.cancelNote()

			this.$emit('create-note', newNote)
		},
		formatDate() {
			const date = new Date();
			const month = date.toLocaleString('default', { month: 'long' });
			const day = date.getDate();
			const year = date.getFullYear();
			const formattedDate = `${month} ${day}, ${year}`;
			return formattedDate
		}

	}
}
</script>


<template>
	<div class="form-container">
		<h3>Create Note</h3>
		<form @submit.prevent="submit">
			<div class="form-control">
				<label for="">Note Title</label>
				<input v-model="noteTitle" type="text" required maxlength="25">
				<div class="input-length">{{ noteTitle.length }} / 25</div>
			</div>

			<div class="form-control">
				<label for="">Note</label>
				<textarea v-model="note" required maxlength="255"> </textarea>
			</div>

			<div class="btn-container">
				<button @click="cancelNote">Cancel</button>
				<button @click="handleSubmit">Add</button>
			</div>
		</form>
	</div>
</template>


<style scoped>
.form-container {
	padding: 2rem 1rem;
	background-color: #fff;
	-webkit-box-shadow: 0px 0px 5px 0px #000000;
	box-shadow: 0px 0px 5px 0px #000000;
	border-radius: 0.5rem;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
	max-width: 90%;

}

h3 {
	text-align: center;
	margin-bottom: 2rem;
	font-size: 1.7rem;
	font-weight: 600;
}

form {
	width: 700px;
	max-width: 100%;
	margin: 0 auto;
}

form input {
	height: 2rem;
	padding: 0 1rem;
}

.input-length {
	text-align: end;
}

form textarea {
	min-height: 5rem;
	padding: 0.5rem 1rem;
}

.form-control {
	display: flex;
	flex-direction: column;
	justify-content: start;
	margin-bottom: 1rem;
	/* align-items: center; */

}


.btn-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.btn-container button {
	height: 2rem;
	font-size: 1.2rem;
	width: 50%;
	cursor: pointer;
}

.btn-container button:nth-child(1) {
	margin-right: 1rem;
	border: solid 1px #DF2E38;
	background-color: transparent;
	color: #DF2E38;
}

.btn-container button:nth-child(2) {
	border: none;
	background-color: #DF2E38;
	color: #fff;
}
</style>