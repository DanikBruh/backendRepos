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
        props: {
            rotated: Boolean,
            prev: Int32Array
        }
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
                    alert("Player has been added!")
                    location.reload();
                    return res.json();
                });
            }
        },
        async putRequest(index) {
            let id = this.results[index].id;
            var parentDOM = document.getElementById("main_block");
            let inputs = parentDOM.children[index].getElementsByClassName("change_form")[0].getElementsByTagName("input");
            var tempObj = {
                number: inputs[0].value,
                first_name: inputs[1].value,
                last_name: inputs[2].value,
                avatar: inputs[3].value,
                wikipedia_url: inputs[4].value
            };
            await axios.put(url + "/" + id, tempObj)
            .then(res => {
                alert("Player's information has been changed!")
                location.reload();
            })
            .catch(function (error) {
                alert("Incorrect input value");
            });
        },
        async rotateChangeBlock(index) {
            var parentDOM = document.getElementById("main_block");
            if(!this.rotated) {
                parentDOM.children[index].firstChild.style.transform = "rotateY(180deg)";
                this.prev = index
                this.rotated = true
            }
            else {
                for(i = 0; i < parentDOM.children.length; i++) {
                    parentDOM.children[i].firstChild.style.transform = "rotateY(0)";
                    this.rotated = false;
                }
                if(this.prev == index)
                    parentDOM.children[index].firstChild.style.transform = "rotateY(0)";
                else {
                    parentDOM.children[index].firstChild.style.transform = "rotateY(180deg)";
                    this.prev = index
                    this.rotated = true;
                }
            }
        }
    }
});

function sortBy() {
    var selectBox = document.getElementById("sort_select");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    switch (selectedValue) {
        // case 'По командам':
        //     vm.results.sort();
        //     alert("List is sorted by team!");
        //     break;
        case 'По номеру':
            vm.results.sort((a, b) => a.number - b.number);
            alert("List is sorted ny number!");
            break;
        case 'По имени':
            // vm.results.sort((a, b) => a.first_name - b.first_name);
            vm.results.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1);
            alert("List is sorted by name!");
            break;
    }
}