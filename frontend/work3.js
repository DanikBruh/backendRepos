const url = "http://localhost:3000/users";

const vm = new Vue({
    el: "#main_block",
    data: {
        results: [],
        obj: {
            number: null,
            first_name: null,
            last_name: null,
            avatar: null,
            wikipedia_url: null
        },
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
        },
        async postRequest() {
            if (this.obj.number != null && this.obj.first_name != null && this.obj.last_name != null && this.obj.avatar != null && this.obj.wikipedia_url != null) {
                await axios.post(url, this.obj).then(res => {
                    alert("Player has been added")
                    location.reload();
                    return res.json();
                });
            }
        },
        async putRequest(index) {
            if (this.obj.number != null && this.obj.first_name != null && this.obj.last_name != null && this.obj.avatar != null && this.obj.wikipedia_url != null) {
                let id = this.results[index].id
                await axios.put(url + "/" + id, this.obj).then(res => {
                    console.log(res.body);
                });
            }
        },
        async changeInfo() {
            
        }
    }
});

let rotated = false
function changeInfo(index) {
    if(!rotated) {
        document.getElementById("card-inner").style.transform = "rotateY(180deg)";
        rotated = true
    }
    else {
        document.getElementById("card-inner").style.transform = "rotateY(0)";
        rotated = false
    }
    
}