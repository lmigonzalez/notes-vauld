<script>
export default {
	name: 'NoteCard',
	props:{
		noteTitle: String,
		note: String,
		date: String,
		deleteNote:{
			type: Function
		},
		editNote:{
			type: Function
		}
	}
}
</script>

<template>
	<div class="notes-container">
		<div>
			<div class="note-header">
				<h2>{{ noteTitle }}</h2>
				<div>
					<button @click="deleteNote(noteTitle)">

						<img src="../../../public/delete.png" alt="delete icon">
					</button>

					<button @click="editNote({id: noteTitle, noteTitle, note})">
						<img src="../../../public/edit.png" alt="edit icon">

					</button>
				</div>
			</div>

			<div class="note-body">
				<p>{{ note }}</p>

				<div class="date">{{ date }}</div>
			</div>

		</div>
	</div>
</template>

<style scoped>
.notes-container {
	width: 1400px;
	max-width: 100%;
	background-color: #FCC8D1;
	padding: 1rem;
	border-radius: 0.5rem;
	margin: 1rem 0;
}

.notes-container button{
	background-color: transparent;
	border-style: none;
	cursor: pointer;
}


.note-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

img {
	width: 25px;
	margin: 0 0.3rem;
	transition: 0.2s ease-in-out;
}
img:hover{
	scale: 1.1;
}

.note-body {
	margin-top: 1.5rem;
}

.date {
	text-align: end;
	font-weight: 700;
	margin-top: 1rem;

}
</style>