let template = renderElement("template").content
let parent = renderElement(".parrots-wrapper")
let zimbawa = products.slice(0, 2)
let locals_template = renderElement(".locals_template").content
let locals_ul = renderElement(".locals_ul")
let zimbawa_form = renderElement(".form_zimbawa")
let localsArray = []
let secondForm = renderElement('.secondForm')
const handleRemove = (event) => {
    let id = event.target.dataset.id-0
    let parse = JSON.parse(window.localStorage.getItem("zimbawa"))
    console.log(parse)
    parse.map((item, index) => {
        if(item.id === id){
            parse.splice(index, 1)
            console.log(parse)
            window.localStorage.setItem("zimbawa", JSON.stringify(parse))
            let parent = event.target.parentNode
            parent.remove()
        }
    })
}
const handleLocals = (event) => {
    let number = Number(event.target.dataset.id)
    console.log(number)
    for(let i = 0; i<zimbawa.length; i++){
        if(zimbawa[i].id === number){
            if(!localsArray.includes(zimbawa[i])){
                localsArray = [...localsArray, zimbawa[i]]
                window.localStorage.setItem("zimbawa", JSON.stringify(localsArray))
                let parse = JSON.parse(window.localStorage.getItem("zimbawa"))
                LocalsRender(parse)
                localsRenderWindow()
            }
        }
    }   
}
function LocalsRender(arr){
    return arr
}
function localsRenderWindow(){
    let result = LocalsRender(JSON.parse(window.localStorage.getItem("zimbawa")))
    if(result.length > 0){
        locals_ul.innerHTML = null
        for(let i = 0; i<result.length; i++){
            let clone = locals_template.cloneNode(true)
            let name_locals = clone.querySelector(".name_locals")
            name_locals.textContent = result[i].title
            let remove_btn = clone.querySelector(".remove_btn")
            remove_btn.addEventListener("click", handleRemove)
            remove_btn.dataset.id = result[i].id
            locals_ul.append(clone)
        }        
    }
}
localsRenderWindow()
const Errors = () => {
    parent.innerHTML = null
    let h1 = createTag("h1")
    h1.textContent  = "Topilmadi"
    parent.appendChild(h1)
}
const renders = (arr) => {
    if(arr.length > 0){
        parent.innerHTML = null
        for(let i = 0; i<arr.length; i++){
            let clone = template.cloneNode(true)
            let img = clone.querySelector("img")
            img.src = arr[i].img
            let name = clone.querySelector(".card-title")
            name.textContent = arr[i].title
            let price = clone.querySelector(".price mark")
            price.textContent = arr[i].price + "$"
            let width_height = clone.querySelector(".width_height")
            width_height.textContent = arr[i].sizes.width + "x" + arr[i].sizes.height
            let  birthDate = clone.querySelector(".birthDate")
            birthDate.textContent  =arr[i].birthDate
            let icon_button = clone.querySelector(".icon_button")
            icon_button.dataset.id = arr[i].id
            if(arr[i].isFavorite === false){
                let icon = icon_button.querySelector(".star")
                icon.className = "fa fa-star-o text-warning"
                icon.dataset.id = arr[i].id
                icon.addEventListener("click", handleLocals)
            }else if(arr[i].isFavorite === true){
                let icon = icon_button.querySelector(".star")
                icon.className = "fa-solid fa-star text-warning"
                icon.dataset.id = arr[i].id
                icon.addEventListener("click", handleLocals)
            }
            parent.appendChild(clone)
        }
    }else{
        Errors()
    }
}
renders(zimbawa)
window.addEventListener("click", (event) => {
    if(event.target.matches(".delete_zimbawa")){
        let parent_remove = event.target.parentNode
        let parent = parent_remove.parentNode
        let ota = parent.parentNode.parentNode
        ota.remove()
    }
})
let search = elementId("search")
let from = elementId("from")
let to  = elementId("to")
let from_width = elementId("from_width")
let to_width = elementId("to_width")
let from_height = elementId("from_height")
let to_height = elementId("to_height")
let sortby = elementId("sortby")
let birth = (dats) => {
    let date = new Date(dats)
    return date
}
let sortObject = {
    name(a, b){
        if(a.title < b.title){
            return -1
        }else{
            return 1
        }
    },
    price_lowest(a,b){
        if(a.price  < b.price ){
            return -1
        }else{
            return 1
        }
    },
    price_hightes(a,b){
        if(a > b){
            return -1
        }else{
            return 1
        }
    },
    birth_heights(a,b){
        if(birth(a.birthDate) < birth(b.birthDate)){
            return -1
        }else{
            return 1
        }
    },
    birth_lowes(a,b){
        if(birth(a.birthDate) > birth(b.birthDate)){
            return -1
        }else{
            return 1
        }
    }
}
const handleSubmit = (event) => {
    event.preventDefault()
    let rejex = new RegExp(search.value, "gi")
    let filter = []
    if(search.value !== "all"){
        filter = zimbawa.filter((item) => item.title.match(rejex))
    }else if(search.value === "all"){
        filter = zimbawa
    }
    if(from.value !== null && to.value !== null){
        filter = filter.filter((item) => item.price > from.value)
        filter = filter.filter((item) =>  item.price < to.value )
    }
    if(from_width.value !== null && to_width.value !== null){
        filter = zimbawa.filter((item) => item.sizes.width > from_width.value)
        filter= filter.filter((item) =>  item.sizes.width < to_width.value )
    }
    if(from_height.value !== null && to_height.value !== null){
        filter = zimbawa.filter((item) => item.sizes.height > from_height.value)
        filter= filter.filter((item) =>  item.sizes.height < to_height.value )
    }

    if(sortby.value !== null){
        filter  = zimbawa.sort(sortObject[sortby.value])
        console.log(sortby.value)
        console.log(filter)
    }
    renders(filter)

    search.value = null
}
let results = []
let parrotTitle = elementId('parrot-title')
let price = elementId('price')
let parrotDate = elementId('parrot-date')
let parrot_width = elementId('parrot_width')
let parrot_height = elementId('parrot_height')
function secondSubmit(event) {
    event.preventDefault()
    let obj =[
        {
            id: 2,
            title: parrotTitle.value,
            img: "https://media.istockphoto.com/photos/amazon-rainforest-parrot-macaw-picture-id1197182594?b=1&k=20&m=1197182594&s=170667a&w=0&h=bBQfSDgofCr_w2DBf79cwQe-JA45i02vCv7Ttx5qcmU=",
            price:price.value ,
            birthDate: parrotDate.value,
            sizes: {
              width: parrot_width.value,
              height: parrot_height.value
            },
            isFavorite: true,
            features: ""
          },
    ]
    for (let i = 0; i < obj.length; i++) {
        zimbawa = [...zimbawa, obj[i]]
    }
    renders(zimbawa)
}
zimbawa_form.addEventListener("submit", handleSubmit)
secondForm.addEventListener('submit', secondSubmit)