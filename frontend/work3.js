const url = "http://localhost:3000/users";
const vm = new Vue({
    el: "#people",
    data: {
        results: []
    },
    mounted() {
        axios.get(url).then(res => {
            this.results = res.data;
        });
    },
    methods: {
        async del(index) {
            let id = this.results[index].id
            this.results.splice(index, 1)
            alert(`Player with ID: ${id} was deleted`)
            await axios.delete("http://localhost:3000/users/" + id)
        }
    }
});