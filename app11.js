// TO DO IN APP
// -add event handlers
// -get input values
// -add the new item to our data structure
// -add the new item to the UI
// -calculate budget 
// -update the UI

// MODULES for structuring our code ( they break code in section with logical task )
// Moduli su vazan aspekt svake cvrste arhitekture aplikacije 
// cuvaju jedinice koda za projekat cisto odvojene i organizovane
// inkapsuliraju neke podatke privatno a druge podatke izloze javno
// ////////////////////TRI MODULA ZA TRI RAZLICITE STVARI////////////////

// -UI module
// get input values
// add the new item to the ui
// update the ui

// -data module
// add the new item to our data structure
// calculate budget

// -controller module
// add event handler
/////////////SAD CU IMPLEMENTIRATI NAJPOPULARNIJI MODUL U JS-U///////
// KAKO KORISTITI MODUL OBRAZAC
// VISE O PRIVATNIM I PUBLIC(JAVNIM) PODATCIMA ENKAPSULACIJA I PODJELI BRIGA (CONCERNS)
// ENKAPSULACIJA NAM DAJE MOGUCNODST DA SAKRIJEMO INFORMACIJE IMPLEMENTACIJE O SPECIFICNO MODULU IZVAN SKOPA OVO SE NEKAD ZOVE API.
// Module kreiramo zato sto zelimo da pravimo delove koda koji su povezani jedni sa drugima
// unutar odvojenih , nezavisnih i organizovanih grupa(jedinica).
// I svaki od ovih modula ce imati funkcije i promenjive koje su privatne ,tj. dostupne samo unutar tog modula gde se nalaze.
// Ovo zelimo tako da drugi kod ne bi mogao nadjacati nas kod.Nas kod ce biti siguran.
// takodje ce biti potrebni i javne funkcije tako da svi moduli mogu da im pristupe.

//VAZNO ubaciti par testerskih metoda radi proveravanja svih segmenata koda svojevremeno














                                                                        //BUDGET CONTROLLER
// module patter synatax is easy (iife and closures)
var budgetController = (function(){ //ovaj modul prati sve income i expenses,budzet i procente [bitna je struktura podataka u arrya-u]
  
  var Expense = function(id,description,value){ //konstruktorska funkcija za expenses
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;//kad nesto nije definisano
  };
  Expense.prototype.calcPercentages = function(totalIncome){
    if(totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    }else{
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentages = function(){
    return this.percentage;
  };
  var Income = function(id,description,value){//konstruktorska funkcija za income
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calculateTotal = function(type){ //racuna totalni budget od income i expenses
    var sum = 0;
    data.allItems[type].forEach(function(current){// currentIndex i compleatArray nisu potrebi ali forEach moze ova tri da ima u callback funciji samo 3 //ovde se u zavisnosti od tipa exp ili inc sabiranju svi exp u exp ili svi inc u inc jedni sa drugima u broju totals [type] i pute sum variable
      sum = sum + current.value;
    });
    /*
    [200,400,100]
    sum = 0 + 200;
    sum = 200+400;
    sum = 600 + 100; //700
    moze bolje od ovog gore da se cuva u globalnoj data strukturi
    */
   data.totals[type] = sum;
  };
  //najbolje je kreirati jednu veliku strukturu podataka nego vise malih zasebnih nerasporedjenih i neurednih 
  // var expenses = []; i ovako tri puta za total expenses i income to je lose
  
  var data = { //ova struktura je bolja
    allItems:{
      exp:[],
      inc:[]
    },
    totals:{
      exp:0,
      inc:0
    },
    budget:0,
    percentage:-1 //nena 0 sto znaci da ne postoji zasad // procenat samo da troskove
  };

  return { // ovde sve public(javne) metode
    addItem:function(type,des,val){
      var newItem,ID;
      
      //ID = 0; kako napraviti ID za svaki predmet [1,2,3,4,5], next ID = 6 ovo je lako samo sto ce biti problem pri brisanju nekih itema kasnije tako da je neupotrebljivo
      //[1,2,4,6,8], next ID = 9 
      //ID = last ID + 1
      if(data.allItems[type].length > 0 ){ //ako je array inc ili exp u allItems prazan ovo se ne izvrsava //u protivno ako ima nesto uutra i length veci od 0 izvrsava se
        ID = data.allItems[type][data.allItems[type].length-1].id + 1; // ovo je id za novi item 0 based formula pogledati ponovo //ID je zadnja vrednost iz inc ili exp array-a sabrana sa 1
      }else{//u protivnom ID je nula za prvi clan koji cemo uneti
        ID = 0;
      }
      
      if(type === "exp"){ //novi predmeti u zavisnosti od tipa bice rasporedjeni u struktri podataka allItems(obj) u inc i exp nizovima u zavisnosti od tipa
        newItem = new Expense (ID,des,val); //kao novi item tj. objekat u exp allItems tipa exp se kreira objekat uz pomoc new operatora sa 3 argumenta id,description,value
      }else if(type === "inc"){
        newItem = new Income(ID,des,val); //ovo isto kao gore samo za income i kreira se objekat u inc type-a i isti argumenti i uz pomoc konstruktora i new operatora
      }

      data.allItems[type].push(newItem); //dodaje novi element na kraj niza ili u inc ili exp
    return newItem; //vraca novi item za obradu
    },
    testing:function(){ // ovo je obavezno radi provere da li se kreiraju stvari kako treba u samoj data strukturi odlican NACIN PROVERE PRAVLJENJE METODE ZA ISPIS
      console.log(data);
    },
    deleteItem:function(type, id){//property za brisanje
      var ids,index;
      // id = 3 
      // ne moze se vako selektovati data.allItems[type][id] je nisu rasporedjeni id-jevi [1,2,3,4,5,6,7...]
      //ids = [1 2 4 6 8]
      ids = data.allItems[type].map(function(current){ //map vraca skroz novi array za razliku od forEach map takodje prima vrenutnu vrednot index i celi array
        return current.id;
      });//ids vraca celi novi array sa svim id-jevima

      index = ids.indexOf(id);//index je jednak ids(array)-ovom broju tj.mestu na kome indexOf pronadje odredjeni id
      if(index !== -1){ // brise samo ako je index drugaciji od -1 //sto znaci da moze biti od 0 elemenat niz pa nadalje +++
        data.allItems[type].splice(index,1);//splice metod za brisanje elemenata niza //splice() metod prvo mesto broj clana koji se brise drugo mesto broj clanova kolko ce ih obrisati
        // fruits.splice(2, 0, "Lemon", "Kiwi"); takodje sa splice moze da se doda od drugog do nultog elementa dva elementa koji su navedeni kao u primeru
        //splice(2,0,"hello","world") ovako se dodaje od drugog pa nadalje clanova kolko god hocemo 
        //splice(0,2,"world","hello") a ovako se samo menjaju dva clana od nultog(prvog) do drugog
        //splice(0,2,"heloo","world","heloo123") a ovako se heloo123 dodaje beskonacno dok su heloo i world fiksirani oni se ne dodaju jer su oni sa 3 definisani sto znaci ako stavim 0,3 i heloo123 ce samo zameniti treci clan nekog niza
      } 
    },

    calculateBudget:function(){
      
      //calculate total income and expenses
      calculateTotal("exp");// posebno za expenses
      calculateTotal("inc");//posebno za income
      //calculate the budget : income - expenses
      data.budget = data.totals.inc - data.totals.exp;//racuna celi budget
      //calculate the percentage of income that we spent
      if(data.totals.inc > 0){//racuna procenat od expeses samo ako ima income koji je veci od 0
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); //procenat troskova od u dobitku
      }else{
        data.percentage = -1;//znaci ne postoji ako je percantage manji od 0
      }
      //expense = 100 and income 200 , spent 50%(33.3333% round it) = 100/200 = 0.5 *100 , moze biti i preko 100% expenses
    },
    calculatePercentages:function(){
      /*
      a=20
      b=10
      c=40
      income = 100
      a = 20/100=20%
      a = 10/100=10%
      a = 40/100=40%
      */
      data.allItems.exp.forEach(function(current){
        current.calcPercentages(data.totals.inc);
      });
    },
    getPercentages:function(){
      var allPerc = data.allItems.exp.map(function(cur){//ako ovo ima 5 elemenata 
        return cur.getPercentages();//ovo se poziva 5 puta i cuva sve u allPerc
      });
      return allPerc;
    },
    getBudget:function(){ //ova metoda vraca budget iz strukture podataka tj. objekta data budget,totalInc,totalExp,percantage(procenata od troskova) propertys,
      return{
        budget:data.budget,
        totalInc:data.totals.inc,
        totalExp:data.totals.exp,
        percentage:data.percentage
      };
    },
  };











})();
                                                                                //UI CONTROLLER
//budgetController je objekat koji sadrzi metodu publicTest jer smo ga vratili 
//ovo sve radi zbog closures
//pregledati closures opet ;)
var UIController =(function(){










      var DOMstrings = { //ovaj objekat je zbog velikog broja klasa koje ce se ponavljati a ponekad i menjati
        inputType:".add__type",
        inputDescription:".add__description",
        inputValue:".add__value",
        inputBtn:".add__btn",
        incomeContainer:".income__list",
        expensesContainer:".expenses__list",
        budgetLabel:".budget__value",
        incomeLabel:".budget__income--value",
        expensesLabel:".budget__expenses--value",
        percentageLabel:".budget__expenses--percentage",
        container:".container",
        expensesPercLabel:".item__percentage",
        dateLabel:".budget__title--month"


      };
      var formatNumber = function(num,type){
        /*
          + or - before number
          exactly 2 decimal points
          comma separating the thousands
  
          1310.4567 -> 2,310.46
          2000 -> 2,000.00
        */
       num = Math.abs(num); //apsolutni broj brise + i - ispred
       num = num.toFixed(2);  //podesava na dve decimale ovo je Number metod prototip toFixed (ovo daje uvek dva decimalna mesta)
      //  sad je ovo string i mozemo koristiti split
      numSplit = num.split(".");
      int = numSplit[0];
      if(int.length > 3){ //ako ima vise od 3 znaci preko hiljadu je 
        int = int.substr(0,int.length-3) + "," + int.substr(int.length - 3,3);
      }
  dec = numSplit[1];
  
  return (type ==="exp"?sign = "-":sign = "+") + " " + int + "." +dec;
  };
  var nodeListForEach = function(list,callback){ //OVDE SE TREBA LOOP-OVATI KROZ OVU NODE LISTU I ONDA PROMENITI TEXT PROPERTIY ZA SVAKI
    for(var i = 0;i < list.length;i++){
      callback(list[i],i);//parametri su current i index first class function
    }
  };
  return {
      getInput: function(){ // posto je potrebno da vrati tri vrednosti vraca objekat zato se ovo pise kao svojstva umesto obicnog definisanja sa var
         return{
          type : document.querySelector(DOMstrings.inputType).value, // bice inc ili exp jer je ispisano u html value
          description : document.querySelector(DOMstrings.inputDescription).value,
          value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
         };  
      },
      addListItem:function(obj,type){
        var html,newHtml,element;
        // create html with placeholder text and then 

      if(type === "inc"){ //poseban element za inc i exp takodje html poseban za inc i exp
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }else if(type==="exp"){
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
        //Replace the placeholder text with some actual data
      newHtml = html.replace('%id%',obj.id)//trazi string i menja ga sa podatcima //ovo ubacuje id da li od inc ili exp u html gore kreirani tako sto ispita sa replace gde se nalazi %nekiElemnti% i onda umesto njih stavi podatke iz objekta koji smo  iz kontroler modula prosledili u UIcontroller 
      newHtml = newHtml.replace('%description%',obj.description); //ovo ubacuje ime samog itema u listi da li od inc ili exp u html gore kreirani tako sto ispita sa replace gde se nalazi %nekiElemnti% i onda umesto njih stavi podatke iz objekta koji smo  iz kontroler modula prosledili u UIcontroller 
      newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));  //ovo ubacuje vrednost(broj) da li od inc ili exp u html gore kreirani tako sto ispita sa replace gde se nalazi %nekiElemnti% i onda umesto njih stavi podatke iz objekta koji smo  iz kontroler modula prosledili u UIcontroller 
      //Insert the html into dom
      document.querySelector(element).insertAdjacentHTML('beforeend',newHtml); //ovime se odredjuje da li newHtml kod u html u ide u income <div> ili expenses <div> sa nekom klasom u ovom primeru u levi blok ili desni i da li ide "prije nego sto se zavrsi" tj. beforeend a newHtml se ubacuje beforeend u levi ili desni div uz pomoc insertAdjacentHTML komande

      },
      getDOMstrings : function(){ //ovo se radi jer obj. nije u istom controleru tako da se , potreban je u "controller" modulu,postaje public
        return DOMstrings;
      },
      clearFields:function(){ //cisit polja nakon unosa 
      var fields,fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription +', '+ DOMstrings.inputValue);//querySelectorAll vraca listu ne array
      //slice() - metod koji se zove na array(nizu) i onda vraca drugi array ali mozemo prevariti ovaj metod tako sto cemo staviti listu u ovaj metod i vratice array
      // fields.slice(); ovo ne radi zato sto je lista nije array
      fieldsArr = Array.prototype.slice.call(fields);//ovo je super fora da se prevari slice!!!
      
      //novi metod na array forEach() moze do 3 argumenta ova callback funkcija(anonimna) dole moze primiti do 3 arguenta
        fieldsArr.forEach(function(current, index , array){ //current je trenutna vrednost koja se obradjuje i to je (inputDescription i inputValue)
          current.value = "";//description i value setuje na "" empty strings
        });
        fieldsArr[0].focus();//vraca fokus na description
    },
    displayBudget:function(obj){//posebno za za svaki dom podeseni podatci za ispis sa textContext
      obj.budget > 0 ? type = "inc":type = "exp";
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
      document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp,'exp');
      if(obj.percentage > 0){
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + ' %';
      }else{
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },
    deleteListItem:function(selectorID){ //remove child event na osnovu parent remove child
      var el = document.getElementById(selectorID);
        el.parentNode.removeChild(el); //uz pomoc prosledjenog id iz controller modula brise se slektovani element klikom na dugme
        // document.getElementById(selectorID).parentNode.removeChild(document.getElementById(selectorID)); ovo je duza verzija
    },
    displayPercentages:function(percentages){ //prikazuje procenat troskova od incoma pored torskova

      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);//kreira dom fields on se odnosi na sve expensesPercLabel tj. sve procente pored troskova u listi I OVA LISTA SE ZOVE NODE LIST
      //u dom tree svi elementi su nazvani NODE 
// U DOM TREE GDE U SVI HTML ELEMENTI NALAZE ZOVU SE NODES
      // var nodeListForEach = function(list,callback){ //OVDE SE TREBA LOOP-OVATI KROZ OVU NODE LISTU I ONDA PROMENITI TEXT PROPERTIY ZA SVAKI
      //   for(var i = 0;i < list.length;i++){
      //     callback(list[i],i);//parametri su current i index first class function
      //   }
      // }; // TAKODJE SE MOZE KORISTITI SLICE METOD DA SE LISTA KONVERTUJE U ARRAY ALI JE TO VISE TRIK I IMA LAKSI NACIN 
      //NACIN NA KOJI KREIRAMO forEach funkciju

      nodeListForEach(fields,function(current,index){//ovo se moze opet koristiti(reusable code za sve node list u programu) //pet puta se izvrsava
        if(percentages[index] > 0){ 
          current.textContent = percentages[index] + "%";
        }else{
          current.textContent = "---";
        }
      });

    },
    displayMonth: function() {
      var now, months, month, year;
      
      now = new Date();
      //var christmas = new Date(2016, 11, 25);
      
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      
      year = now.getFullYear();
      document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
  },
  changedType:function(){

    var fields = document.querySelectorAll(
      DOMstrings.inputType + ","+
      DOMstrings.inputDescription + ","+
      DOMstrings.inputValue );
    nodeListForEach(fields,function(cur){
      cur.classList.toggle("red-focus"); //toggle je bolje od add jer je add trajno
    });
    document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
  }
  };







})();
                                                                           //CONTROLLER
var controller =(function(budgetCtrl,UICtrl){ //controller je mjesto gde govorimo ostalim modulima sta da rade









var setupEventListeners = function(){ // nemoram se brinuti oce li se ovo pokrenuti jer je u iife-u sto znaci da ce se automatski pokrenuti ,a takodje je smesteno u init funkcijikoja se pokrece na samom pocetku
    
    var DOM = UICtrl.getDOMstrings(); //sad je objekat iz UIController dobio novo ime za ovaj modul "DOM" , ovde stoji jer treba trenutno tu 

    document.querySelector(DOM.inputBtn).addEventListener("click",ctrlAddItem);
    
    document.addEventListener("keypress",function(event){ // moze se kao argument staviti i (e) umesto event ali je jasnije event//ovo je event kad se nesto klikne na tastaturi da se izvrsava blok koda ovde je postavljen enter a mozemo naci broj keyCode se trazi na ovom sajtu https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    
      if(event.keyCode === 13 || event.which ===13){ //ovo je if za enter (tj. return) ispituje da li je kliknuto enter i vazi za stare i nove brovsere
      ctrlAddItem();
    }
  });
  document.querySelector(DOM.container).addEventListener("click",ctrlDeleteItem);//klikom na element klase container pokrece se ctrlDeleteItem koji brise neki element

  document.querySelector(DOM.inputType).addEventListener("change",UICtrl.changedType);
};

var updateBudget = function(){//ovo se radi da se ne bi ponavljano cesto

  // 1. Calculate the budget  // izracunati budget 
  budgetCtrl.calculateBudget();
  // 2.return the budget
  var budget = budgetCtrl.getBudget(); //ovde se kreira budget objekat iz kojeg se ispisuje UI grafika dve linije ispod \|/
  // 3. Display the budget on the UI // prikazati budzet 
  UIController.displayBudget(budget);//ovde je pokrece ispis budgeta u UI
}; 
    //\
// /|||\
//  |||
//  |||
// \|||/
//  \\/
var updatePercentage = function(){ //slicno je update budget

  // 1. Calculate percantage
    budgetCtrl.calculatePercentages();
  // 2. Read percentage from the budget controller
    var percentages = budgetCtrl.getPercentages();
  // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
};

var ctrlAddItem = function(){
  var newItem,input; //ovo se nece pojaviti javno ali ce biti u data strukturi
  // 1. Get the field input data //dobiti podatke koji su uneseini pute inputa
  input = UICtrl.getInput(); //input ce sadrzati tip(inc ili exp)
  if(input.description !== "" &&  !isNaN(input.value) && input.value > 0){ //ovo ispituje da li je description "" i da nije Not A Number input.value i da je vece od 0
  // 2. Add the item to the budget controller // dodati item u budget contorler 
  newItem = budgetCtrl.addItem(input.type,input.description,input.value);

  // 3. Add the item to the UI //dodati item u user interface
  
  UICtrl.addListItem(newItem,input.type);
  
  //4.clear the fields
  
  UIController.clearFields();
  
  //5.calculate and update budget
  
  updateBudget();
  
  //6. Calculate and update percentage
  updatePercentage();
}
};

var ctrlDeleteItem = function(event){ //event objekat za target element trazenje target-a
  var itemID,splitID,type,ID;
  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; //ovo ispisuje element koji je kliknut , sa parentNode smo se pomerili na parent od tog jednog ovo se moze kucati beskonacno .parentNode.parentNode.parentNode to je tri mesta na gore
  //posto znamo da samo neki elementi imaju id ovo se dole radi
  if(itemID){

    //inc-1 automatsko wrapovanje number i string tipa
    splitID = itemID.split("-");
    type = splitID[0];
    ID = parseInt(splitID[1]);
    
    //1.delete the item form data structure
    budgetCtrl.deleteItem(type,ID);
    //2.delete the item form the UI
    UICtrl.deleteListItem(itemID);
    //3.update and show the new budget
    updateBudget();
  }
};

return {
  init:function(){ //funkcija koja se pokrece sama od sebe pri svakom ulazenju u program
    UICtrl.displayMonth();
    UICtrl.displayBudget(//ova funkcija vraca objekat sa setovanim svim vrednostima na 0 tako da se u UIcontrolleru taj obj obradjuje i ispisuje 0 na pocetku programa
      {budget:0,
        totalInc:0,
        totalExp:0,
        percentage:-1});
    setupEventListeners(); // event listeneri ce biti podeseni cim pozovemo init metodu(funkciju)
  }
};

})(budgetController,UIController);

controller.init(); //u init se nalazi sav kod koji zelimo da see izvrsi kad nasa aplikacija pocinje trenutno je samo setup event listeners,
//separation of concerns to znaci da svaki dio aplikacije moze jedino zainteresovan da radi jednu stvar nezavisno od drugih ne mora da zna da drugi moduli postoje.
//svaki modul je odvojen od drugog tako da se budget modul moze uzeti za drugu aplikaciju i nece urusiti drugi modul samim nedostatkom.

// Event delegation je to da ne stavljamo event handeler na originalni element tj. onaj koji smo zainteresovani (TARGET ELEMENT) nego da nalepimo event handler na parent element od targeta i da tu uhvatimo event zbog event bubblinga(tj. da se event kaci sa targeta na sve roditelje iznad pa tako sve do html tj. do root-a) i onda preko parenta koristeci targetElement Property doci do onog koji smo zainteresovani
// event bubbling kad je event nekako pokrenut na nekom dom-u taj event se pokrece ne samo na tom elementu nego i na svim njegovim parent elementima
// event je pokrenut na dugmetu ali je takodje pokrenut na svi parent elementima
// slucaji za koriscenje event delegation
// 1. kad jedan element ima puno child elementa u koje smo zainteresovani da postavimo event
// 2. kad zelimo neki event handler da nalepljen na element koji jos nije u DOM kad je stranica u potpunosti ucitana
// dom traversing




















