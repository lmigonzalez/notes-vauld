<script>

export default {

	name: 'NoteForm',
	props: {
		editNote: {
			type: Function
		},
		closeForm: {
			type: Function
		},
		noteToEdit: Object,
		notes: Array

	},
	data() {
		return {
			note: this.noteToEdit
		}
	},
	methods: {
		cancelNote() {
			this.closeForm()
		},
		handleSubmit() {
			let obj = {
				id: this.noteToEdit.id,
				noteTitle: this.noteToEdit.noteTitle,
				note: this.noteToEdit.note
			}
		if (this.note.note.trim() === '') {
				alert('Note is required');
				return;
			}
			this.editNote(obj, () => {
				this.closeForm()
			})
		},

	}
}
</script>

<template>
	<div class="form-container">
		<h3>Edit Note</h3>
		<form @submit.prevent="submit">
			<div class="form-control">
				<p class="title">Title: {{ note.noteTitle }}</p>
				
			</div>

			<div class="form-control">
				<label for="">Note</label>
				<textarea v-model="note.note" required maxlength="255"> </textarea>
			</div>

			<div class="btn-container">
				<button @click="cancelNote">Cancel</button>
				<button @click="handleSubmit">Save</button>
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

.title{
	font-size: 1.3rem;
	font-weight: 600;
}

h3 {
	margin-bottom: 2rem;
	font-size: 1.7rem;
	font-weight: 600;
	text-align: center;
}

form {
	width: 700px;
	max-width: 100%;
	margin: 0 auto;
}

.input-length {
	text-align: end;
}


form input {
	height: 2rem;
	padding: 0 1rem;
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