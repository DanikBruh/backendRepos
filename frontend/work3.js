const url = "http://localhost:3000/users";

/* Modal window */
// const Modal = {
//     name: 'modal',
//     template: '#modal',
//     methods: {
//         close(event) {
//             this.$emit('close');
//         }
//     }
// };

const vm = new Vue({
    el: "#main_block",
    // components: {
    //     modal: Modal,
    // },
    data: {
        results: [],
        obj: {
            number: null,
            first_name: null,
            last_name: null,
            avatar: null,
            wikipedia_url: null
        },
        // isModalVisible: false
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
            let id = this.results[index].id
            alert(url + "/" + id);
            await axios.put(url + "/" + id, this.obj).then(res => {
                console.log(res.body);
            });
        },
        // showModal() {
        //     this.isModalVisible = true;
        // },
        // closeModal() {
        //     this.isModalVisible = false;
        // }
    }
});




// let myButton = document.getElementById('button');
// myButton.addEventListener('click', function(ev) {
// let number = document.forms['form'].elements['number'].value;
// let first_name = document.forms['form'].elements['name'].value;
// let last_name = document.forms['form'].elements['surname'].value;
// let img_url = document.forms['form'].elements['image'].value;
// let wikipedia_url = document.forms['form'].elements['wikipedia'].value;
// // let pass = document.forms['form'].elements['password'].value;

// let obj = {
//     number: number,
//     first_name: first_name,
//     last_name: last_name,
//     avatar: img_url,
//     wikipedia_url: wikipedia_url
// };

// if (this.obj.number != null && this.obj.first_name != "" && this.obj.last_name != "" && this.obj.avatar != "" && this.obj.wikipedia_url != "") {

//     fetch(url, {
//             method: 'POST',
//             body: JSON.stringify(obj),
//             headers: {
//                 'content-type': 'application/json'
//             }
//         })
//         .then(function(res) {
//             return res.json();
//         })
//         .catch(alert);
//     }
// })