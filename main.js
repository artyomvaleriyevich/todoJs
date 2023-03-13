let todos = [
]

let list = document.querySelector('.list')
let form = document.querySelector('.form')
let listUndefined = document.querySelector('list-undefined')
let status = 'all'


let day = document.querySelector('.day')
let month = document.querySelector('.month')
let year = document.querySelector('.year')
let weekDay = document.querySelector('.weekDay')


let now = new Date()



const toDate = (data)=>{
    return new Intl.DateTimeFormat('en-En',{
        day:'2-digit',
        month:'long',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        weekday:'long'
    }).format(new Date(data))
}




let nowDate = toDate(now).split(' ')

day.textContent = nowDate[2].replace(',','')
month.textContent = nowDate[1].replace(',','')
year.textContent = nowDate[3].replace(',','')
weekDay.textContent = nowDate[0].replace(',','')




const addList = (status = '', time = ' ') => {
    todos.filter((item)=>{
        if (status === 'done'){
            return item.done
        }else  if (status === 'important'){
            return  item.important
        }else{
            return item
        }
    }).forEach((item)=>{
        let li = document.createElement('li')
        let btn = document.createElement('button')
        let done = document.createElement('button')
        let imp = document.createElement('button')
        let date = document.createElement('span')
        let div = document.createElement('div')
        date.textContent = `${item.date.slice(8,10)} - ${item.date.slice(11,16)}`
        imp.textContent = 'Важная задача'
        imp.classList.add('btn-imp')
        if (item.important){
            li.style.color = 'gold'
            imp.style.background = 'gold'

        }
        imp.addEventListener('click',()=>{
            item.important = !item.important
            list.innerHTML = ''
            addList()
        })
        done.classList.add('btn-done')
        done.setAttribute('data-id',item.id)
        done.addEventListener('click',()=>{
            item.done = !item.done
            list.textContent = ''
            addList()
        })
        if (item.done){
            done.style.background = 'limegreen'
            li.style.color = 'limegreen'
            li.style.textDecoration = 'limegreen'
        }
        btn.textContent = 'Удалить'
        btn.classList.add('btn-delete')
        btn.setAttribute('data-id',item.id)
        btn.addEventListener('click',()=>{
            todos = todos.filter((el,i)=>{
                return el.id !== +btn.dataset.id
            })
            list.textContent = ''
            addList()
        })
        div.classList.add('div-btn')
        div.prepend(imp)
        div.append(btn)
        li.textContent = item.text
        li.setAttribute('id',item.id)
        li.classList.add('list-item')
        li.prepend(done)
        li.prepend(date)
        li.append(div)
        list.append(li)
        document.querySelector('.list').childNodes.length  ? document.querySelector('.list-undefined').style.display = 'none' : document.querySelector('.list-undefined').style.display = 'block'
    } )
}



form.addEventListener('submit',(e)=>{
    e.preventDefault() // чтобы убрать обновление страницы
    todos = [...todos,{
        id:todos.length ?todos[todos.length - 1].id + 1:1,
        text: e.target[0].value,
        important:false,
        done:false,
        date: new Date().toISOString()
    }]
    e.target[0].value = ''
    list.textContent = ''
    document.querySelector('.list').childNodes.length > 0 ? document.querySelector('.list-undefined').style.display = 'block' : document.querySelector('.list-undefined').style.display = 'none'
    addList()
})



let all = document.querySelector('.all')
let imp = document.querySelector('.imp')
let done = document.querySelector('.done')

all.addEventListener('click',()=>{
    list.textContent = ''
    addList('')
})

imp.addEventListener('click',()=>{
    list.textContent = ''
    addList('important')
})

done.addEventListener('click',()=>{

    list.textContent = ''
    addList("done")
})

VANTA.NET({
    el: "#body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xfff00,
    backgroundColor: 0x1a1a28,
    points: 14.00,
    maxDistance: 25.00,
    spacing: 18.00
})


