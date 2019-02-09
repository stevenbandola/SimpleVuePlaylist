
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 var song = Vue.component('song', {
 	props: ['song', 'index'],
 	template: `
 		<li class="list-group-item">
 		    <button 
 		    	type="button" 
 		    	class="btn btn-danger float-right" 
 		    	@click="$emit('delete-button-clicked')"
 	    	>X</button>
 	    	<button
 		    	type="button" 
 		    	class="btn float-right mr-2"
 		    	:class="{
 		    		'btn-outline-warning': !song.favorited,
 		    		'btn-warning': song.favorited
 		    	}"
 		    	@click="$emit('favorite-button-clicked', song)"
 	    	>Favorite</button>
 		    <h3>{{ song.title }}</h3>
 		    <small>{{ song.artist }}</small>
 		</li>
 	`,
 });
 var playlist = Vue.component('playlist', {
 	data(){
 		return {
 			newSong: {
 				title: "",
 				artist: "",
 			},
 			songs: []
 		}
 	},
 	created(){
 		axios.get('/api/songs')
 		.then(response => {
			this.songs = response.data;
		});
 	},
 	methods: {
 		addSong(){
 			var newSong = new Object({
 				title: this.newSong.title,
 				artist: this.newSong.artist,
 				favorited: false
 			});
 			this.songs.push(newSong);
 			this.newSong.title = "";
 			this.newSong.artist = "";
 		},
 		favoriteSong(index){
 			var song = this.songs[index];
 			song.favorited = !song.favorited;

	 		axios('/api/song/'+ song.id, {
				method: 'POST',
				data: song,				
			}).then(response => {
				// console.log(response);
				this.songs = response.data;
			});
 		}
 	},
 	template: `
 		<div>
 			<div id="add-song" class="mt-5 p-3 rounded border">
 			    <h2>Add Song</h2>
 			    <div class="form-group">
 			        <label for="song-title">Song Title</label>
 			        <input v-model="newSong.title" type="text" class="form-control" id="song-title" placeholder="Enter song title">
 			    </div>
 			    <div class="form-group">
 			        <label for="song-artist">Artist</label>
 			        <input v-model="newSong.artist" type="text" class="form-control" id="song-artist" placeholder="Enter artist">
 			    </div>
 			    <button @click="addSong" type="submit" class="btn btn-primary">Add Song</button>
 			</div>
 			<ul class="list-group mt-5">
 			    <song 
 			    	v-for="(song, index) in songs"
 			    	@delete-button-clicked="songs.splice(index, 1)"
 			    	@favorite-button-clicked="favoriteSong(index)"
 			    	:key="index"
 			    	:song="song"
 			    	>
 			    </song>
 			</ul>
 		</div>
 	`,
 });
 var app = new Vue({
 	el: "#app"
 });
