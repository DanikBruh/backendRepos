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
        async change(index) {
            // let form = document.getElementsByClassName("change_block")
            // form.style.opacity = "1"

        },
        async del(index) {
            let id = this.results[index].id
            this.results.splice(index, 1)
            alert(`Player with ID: ${id} was deleted`)
            await axios.delete("http://localhost:3000/users/" + id)
        }
    }
});

let myButton = document.getElementById('button');
myButton.addEventListener('click', function(ev) {
    let number = document.forms['form'].elements['number'].value;
    let first_name = document.forms['form'].elements['name'].value;
    let last_name = document.forms['form'].elements['surname'].value;
    let img_url = document.forms['form'].elements['image'].value;
    let wikipedia_url = document.forms['form'].elements['wikipedia'].value;
    // let pass = document.forms['form'].elements['password'].value;

    let obj = {
        number: number,
        first_name: first_name,
        last_name: last_name,
        avatar: img_url,
        wikipedia_url: wikipedia_url
    };

    if (obj.number != null && obj.first_name != "" && obj.last_name != "" && obj.avatar != "" && obj.wikipedia_url != "") {
        fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .catch(alert);
        alert("Player has been added")
    }
})