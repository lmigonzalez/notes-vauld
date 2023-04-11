<script>
export default {
	name: 'SearchBar',
	data() {
		return {
			note: this.noteToEdit,
			keyword: ''
		}
	},
	props: {
		notes: Array,
		filterArray: Function

	},
	methods: {

		filterArrayOfNotes() {
			this.filterArray(this.keyword)
		}
	}
}
</script>

<template>
	<div class="search-container">
		<input @input="filterArray(keyword)" v-model="keyword" type="text" placeholder="Search for a note..." />

	</div>
</template>

<style scoped>
.search-container {
	display: flex;
	justify-content: end;
	margin-top: 1rem;
}

input {
	width: 350px;
	height: 2rem;
	border-radius: 0.5rem;
	border: 1px solid #DF2E38;
	padding: 0 1rem;
}
</style>