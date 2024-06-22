class Car {//car framework
    constructor(model, year) {
    this.model = model;
    this.year = year;
    }
        describe(){ //function to describe a specific make and model
            return `${this.year} ${this.model}`;
        }
}
//manufacturer 
class Make {//TODO - names consistency
    constructor(make){
        this.make = make;
        this.models = [];
    }
    addCar(car) {
        if(car instanceof Car){
            this.models.push(car);
        }else{
        throw new Error(`You can only add cars. Argument is not a car: ${car}`);
        }
    }
    describe(){
        return `${this.make} manufactures ${this.models.length} different models.`;
    }    
}

//Starting Menu for initial selections
class Menu{
    constructor(){
        this.makers = [];
        this.selectedMaker = null;
    }
    start(){
        let selection = this.showMenuOptions()
        while (selection != 0){
            switch(selection){
            case '1':
                this.createMaker();
                break;
            case '2':
                this.viewMaker();
                break;
            case '3':
                this.deleteMaker();
                break;
            case '4':
                this.displayMakers();
                break;
            default:
                selection = 0;
            } 
            selection = this.showMenuOptions();
        }
        alert('Ending...');
    }
    showMenuOptions() {//basic text optionscorrespond to case numbers
        return prompt(`
        0) exit
        1) create a new manufacturer
        2) view a manufacturer
        3) remove a manufacturer
        4) display manufacturers list
        `);
    }
    showMakerMenuOptions(teamInfo) {//basic text options correspond to case numbers
        return prompt(`
        0) back
        1) add a new car
        2) remove a car
        -----------------
        ${teamInfo}
        `);
    }
    //Case 1
    createMaker(){
        let name = prompt('Enter manufacturer name: ');
        this.makers.push(new Make(name));//
        console.log(this.makers)//console notes for debugging
    }
    //Case 2
    viewMaker (){
        let index = prompt('Enter the index of the manufacturer you want to view');
        if(index > -1 && index < this.makers.length){
            this.selectedMaker = this.makers[index];
            let desciption = 'Manufacturer: ' + this.selectedMaker.make +'\n';
            desciption += ' '+ this.selectedMaker.describe() + '\n';
            for(let i = 0; i<this.selectedMaker.models.length; i++){
                desciption += i + ')' + this.selectedMaker.models[i].describe() + '\n';
            }
            let selection1 = this.showMakerMenuOptions(desciption);
            switch(selection1){
                case '1':
                this.createCar();
                break;
                case '2':
                this.deleteCar();
            }
        }
    }
    //case 3
    deleteMaker(){
        let index = prompt('Enter the number of the manufacturer you want to remove: ');
        if(index > -1 && index < this.makers.length){
            this.makers.splice(index,1);//remove by splicing (1 element only)
        }
    }
    //case 4
    displayMakers(){
        let makersString = '';//start with nothing

        for(let i = 0; i < this.makers.length; i++){
            makersString += '\n' + i + ') ' + this.makers[i].make;
        }
        alert(makersString)
    }
    //subCase1 for making car
    createCar(){
        let model = prompt('Enter model name: ');
        let year = prompt('What year was the car produced: ');
        this.selectedMaker.addCar(new Car(model,year));
    }
    //delete car
    deleteCar(){
        let index = prompt('Enter the number of the car you want to remove:');
        if(index > -1 && index < this.selectedMaker.models.length){
            this.selectedMaker.models.splice(index,1);
        }
    }
}
let menu = new Menu()
menu.start();
