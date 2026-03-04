const lodeLesson =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((lesson)=>displayLesson(lesson.data))
}

 const addOutlineBtn=()=>{
     const lessonBtns=document.querySelectorAll('.lesson-btn');
     lessonBtns.forEach(btn => btn.classList.remove('active'));
 }

const getWord=(id)=>{
    spinnerManege(true);
    const url=`https://openapi.programming-hero.com/api/level/${id} `;
    fetch(url)
    .then((res) => res.json())
    .then((data)=> {
        addOutlineBtn();
         const onclick =document.getElementById(`levels-btn-${id}`);
         onclick.classList.add('active')
         console.log(onclick)
        displayLevelWord(data.data)})
}

const spinnerManege=(status)=>{
    if(status==true){
        document.getElementById('loding').classList.remove('hidden');
        document.getElementById('card-containar').classList.add('hidden');
    }
    else{
        document.getElementById('card-containar').classList.remove('hidden');
        document.getElementById('loding').classList.add('hidden');
    }
}

const loadWordDeteil=(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((info) =>{
        displayWordDeteil(info.data);
    })
}

const displayWordDeteil=(deteils)=>{
     console.log(deteils)
    const deleilsContainar=document.getElementById('deteils-containar');
    deleilsContainar.innerHTML=`
        <h2 class="text-xl font-bold">${deteils.word} (<i class="fa-solid fa-microphone-lines"></i>:${deteils.pronunciation})</h2>
        <br>
        <P class="text-lg font-semibold">Meaning</p>
        <P class="text-lg  font-bangla">${deteils.meaning}</p>
        <br>
        <P class="text-lg font-semibold">Example</p>
        <P class="text-lg ">${deteils.sentence}</p>
        <br>
        <p class="font-bangla text-lg font-semibold">সমার্থক শব্দ গুলো</p>
        <span class="btn">${deteils.synonyms[0]}</span>
        <span class="btn">${deteils.synonyms[1]}</span>
        <span class="btn">${deteils.synonyms[2]}</span>
        `;
    document.getElementById('my_modal_5').showModal()
    
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const displayLevelWord=(levels)=>{
    //  console.log(levels);
    const cardContainar=document.getElementById("card-containar");
    cardContainar.innerHTML='';

    if(levels.length == 0){
        cardContainar.innerHTML=`
        <div class="text-center col-span-full space-y-2">
             <img src="./assets/alert-error.png"class="mx-auto">
            <p class="font-bangla font-semibold text-sm text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <h2 class="font-bangla text-3xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
        
        `;
    }
    levels.forEach(word => {
        // console.log(word)
        const wordCard=document.createElement('div');
        wordCard.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm py-10 px-4 text-center space-y-4">
            <h2 class="font-bold text-xl">${word.word ? word.word : "this word is not found"}</h2>
            <p class="font-semibold text-lg font-bangla">${word.meaning ? word.meaning : "this word is not found"}</p>
            <p class="font-semibold text-lg font-bangla">${word.pronunciation ? word.pronunciation : "this word is not found"} </p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDeteil(${word.id})" class="btn bg-slate-100 hover:bg-slate-400"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-slate-100 hover:bg-slate-400"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        cardContainar.appendChild(wordCard)
    });
    spinnerManege(false);
}

const displayLesson =(lessons)=>{
    // console.log(lessons);
    const lesoonContainer=document.getElementById("level-containar");
    lesoonContainer.innerHTML='';
    lessons.forEach(lesson => {
        const newDiv=document.createElement('div')
        newDiv.innerHTML= `
        <button id="levels-btn-${lesson.level_no}" onclick="getWord(${lesson.level_no})" class="btn btn-primary btn-outline lesson-btn"><a><span><i class="fa-solid fa-book-open"></i></span> Lesson ${lesson.level_no}</a></button>
        `;
        lesoonContainer.appendChild(newDiv)
    });
}
lodeLesson();

document.getElementById('surch-option').addEventListener('click',() =>{
    
    const input=document.getElementById('input-search').value.trim().toLowerCase();
    // console.log(input);
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then((data)=> {
        const allWord=data.data;
        const filterWord=allWord.filter((word)=> word.word.toLowerCase().includes(input));
        // console.log(filterWord)
        displayLevelWord(filterWord);
    })
})