let validadorForm = {
    handleSubmit: (event)=>{
        event.preventDefault();
        let enviar = true;

        let inputs = form.querySelectorAll('input');

        validadorForm.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validadorForm.checkInput(input);
            if(check !== true ){
                enviar = false;                
                validadorForm.showError(input, check)
            } 
        }
        //enviar = false; //REMOVER ESSA LINHA DEPOIS
        if(enviar){
            form.submit();
        }
    }, 
    checkInput: (input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');            
            for (let key in rules) {
                let rulesDetails = rules[key].split('=');                
                switch(rulesDetails[0]){
                   case 'required':
                       if(input.value == ''){
                            return 'Campo nao pode ser vazio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < 4){
                            return `Campo tem que ter pelo menos ${rulesDetails[1]} caracteres`
                        }
                    break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value)) {
                                return 'Email invalido'
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error)=>{
        console.log(input)
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error')
        errorElement.innerHTML = error;
        
        input.parentElement.insertBefore(errorElement, input.ElementSibling);    
    }, 
    clearErrors: ()=>{
        let inputs = form.querySelectorAll('input');
        inputs.forEach((item)=>{
            item.style.borderColor = '';
        })

        let errorElements = document.querySelectorAll('.error');
        errorElements.forEach((item)=>{
            item.remove();
        })
    }
}

let form = document.querySelector('.js-validator');
form.addEventListener('submit', validadorForm.handleSubmit);


